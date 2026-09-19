import { describe, expect, it } from "vitest";
import {
  conditionSummary,
  conditionText,
  deriveRuleStatus,
  formatRemaining,
  normalizeDraft,
  reminderLabel,
  validateRuleDraft,
  validateStep,
} from "../../notifications-model.js";
import type { NotificationRule, NotificationRuleDraft } from "../../notifications-types.js";

const sampleDraft = (): NotificationRuleDraft => ({
  name: "Alerta de Servidor",
  enabled: true,
  source: {
    entity_id: "sensor.temperatura_rack",
    display_name: "Sensor Rack",
    area_name: "Sistemas",
  },
  condition: {
    type: "above",
    threshold: 32.5,
    lower: 18,
    upper: 28,
    for_seconds: 300,
    hysteresis: 1.0,
  },
  recipients: [
    {
      target_id: "phone_admin_1",
      device_id: "dev_123",
      notify_entity_id: "notify.mobile_app_pixel_7",
      name: "Pixel 7 Pro",
      custom_name: "Celular Guardia",
    },
  ],
  message: {
    title: "Temperatura Alta en Rack",
    body: "{sensor} ha alcanzado {value} {unit}. Umbral: {threshold} {unit}.",
    recovery_title: "Rack Normalizado",
    recovery_body: "{sensor} volvió a nivel seguro ({value} {unit}).",
  },
  behavior: {
    notification_mode: "repeat",
    reminder_interval_seconds: 1800,
    notify_recovery: true,
  },
});

describe("notifications-model: validateStep & validateRuleDraft", () => {
  it("valida paso 1: sensor obligatorio con prefijo sensor.*", () => {
    const draft = sampleDraft();
    expect(validateStep(1, draft)).toBe("");

    draft.source.entity_id = "";
    expect(validateStep(1, draft)).toContain("Selecciona un sensor");

    draft.source.entity_id = "binary_sensor.puerta";
    expect(validateStep(1, draft)).toContain("sensor.*");
  });

  it("valida paso 2: umbrales, rangos, histéresis y duración", () => {
    const draft = sampleDraft();
    expect(validateStep(2, draft)).toBe("");

    // Umbral no numérico
    draft.condition.threshold = "invalido";
    expect(validateStep(2, draft)).toContain("umbral de temperatura válido");

    // Histéresis negativa
    draft.condition.threshold = 30;
    draft.condition.hysteresis = -0.5;
    expect(validateStep(2, draft)).toContain("histéresis");

    // Duración negativa o excesiva
    draft.condition.hysteresis = 0.5;
    draft.condition.for_seconds = 90000;
    expect(validateStep(2, draft)).toContain("duración");

    // Rango outside con lower >= upper
    draft.condition.for_seconds = 60;
    draft.condition.type = "outside";
    draft.condition.lower = 25;
    draft.condition.upper = 20;
    expect(validateStep(2, draft)).toContain("estrictamente menor");

    // Histéresis excesiva para outside (h * 2 >= upper - lower)
    draft.condition.lower = 20;
    draft.condition.upper = 22;
    draft.condition.hysteresis = 2.0; // 2.0 * 2 = 4 >= (22 - 20 = 2)
    expect(validateStep(2, draft)).toContain("demasiado grande para ese rango");

    // Modo repeat con intervalo < 60s
    draft.condition.hysteresis = 0.5;
    draft.behavior.notification_mode = "repeat";
    draft.behavior.reminder_interval_seconds = 30;
    expect(validateStep(2, draft)).toContain("al menos 1 minuto");
  });

  it("valida paso 3: destinatarios requeridos y con endpoints válidos", () => {
    const draft = sampleDraft();
    expect(validateStep(3, draft)).toBe("");

    draft.recipients = [];
    expect(validateStep(3, draft)).toContain("al menos un dispositivo");

    draft.recipients = [
      {
        name: "Dispositivo roto",
      },
    ];
    expect(validateStep(3, draft)).toContain("no tiene entidad ni acción notify válida");
  });

  it("valida paso 4: nombre y mensaje obligatorios", () => {
    const draft = sampleDraft();
    expect(validateStep(4, draft)).toBe("");

    draft.name = "";
    expect(validateStep(4, draft)).toContain("nombre interno");

    draft.name = "Regla de prueba";
    draft.message.body = "   ";
    expect(validateStep(4, draft)).toContain("mensaje de la notificación no puede quedar vacío");

    draft.message.body = "A".repeat(2001);
    expect(validateStep(4, draft)).toContain("no puede superar los 2000 caracteres");
  });

  it("valida la regla completa secuencialmente con validateRuleDraft", () => {
    const draft = sampleDraft();
    expect(validateRuleDraft(draft)).toEqual({ valid: true, step: 0, error: "" });

    draft.recipients = [];
    const res = validateRuleDraft(draft);
    expect(res.valid).toBe(false);
    expect(res.step).toBe(3);
    expect(res.error).toContain("al menos un dispositivo");
  });
});

describe("notifications-model: normalizeDraft", () => {
  it("normaliza números, tipos y conserva identidades completas", () => {
    const draft = sampleDraft();
    draft.condition.for_seconds = 180;
    draft.condition.hysteresis = "1.5";
    draft.condition.threshold = "28.5";

    const normalized = normalizeDraft(draft);
    expect(normalized.name).toBe("Alerta de Servidor");
    expect(normalized.enabled).toBe(true);

    const c = normalized.condition as any;
    expect(c.type).toBe("above");
    expect(c.threshold).toBe(28.5);
    expect(c.hysteresis).toBe(1.5);
    expect(c.for_seconds).toBe(180);

    const b = normalized.behavior as any;
    expect(b.notification_mode).toBe("repeat");
    expect(b.reminder_interval_seconds).toBe(1800);
    expect(b.notify_recovery).toBe(true);

    const r = normalized.recipients as any[];
    expect(r).toHaveLength(1);
    expect(r[0].target_id).toBe("phone_admin_1");
    expect(r[0].notify_entity_id).toBe("notify.mobile_app_pixel_7");
    expect(r[0].custom_name).toBe("Celular Guardia");
  });

  it("asigna 0 a reminder_interval_seconds en modo once y 86400 en daily", () => {
    const draft = sampleDraft();
    draft.behavior.notification_mode = "once";
    expect((normalizeDraft(draft).behavior as any).reminder_interval_seconds).toBe(0);

    draft.behavior.notification_mode = "daily";
    expect((normalizeDraft(draft).behavior as any).reminder_interval_seconds).toBe(86400);
  });
});

describe("notifications-model: conditionText, conditionSummary & reminderLabel", () => {
  it("genera etiquetas legibles de condición", () => {
    expect(conditionText({ type: "above", threshold: 28, for_seconds: 300 })).toBe("≥ 28 °C · 5 min");
    expect(conditionText({ type: "below", threshold: 16, for_seconds: 0 })).toBe("≤ 16 °C");
    expect(conditionText({ type: "outside", lower: 18, upper: 26, for_seconds: 120 })).toBe("Fuera de 18–26 °C · 2 min");
    expect(conditionText({ type: "inside", lower: 20, upper: 24, for_seconds: 0 })).toBe("Dentro de 20–24 °C");
  });

  it("genera resumen en lenguaje natural con histéresis y modo", () => {
    const draft = sampleDraft();
    const summary = conditionSummary(draft);
    expect(summary).toContain("Sensor Rack activará la alerta al alcanzar o superar 32.5 °C durante 5 minutos");
    expect(summary).toContain("Con una histéresis de 1 °C, se considera resuelta a 31.5 °C o menos");
    expect(summary).toContain("recordará cada 30 minutos");
    expect(summary).toContain("También avisará cuando la incidencia se considere resuelta");
  });

  it("genera etiquetas de recordatorio adecuadas", () => {
    expect(reminderLabel({ notification_mode: "once" })).toBe("Una vez por incidencia");
    expect(reminderLabel({ notification_mode: "daily" })).toBe("Cada 24 h mientras siga activa");
    expect(reminderLabel({ notification_mode: "repeat", reminder_interval_seconds: 600 })).toBe("Cada 10 min mientras siga activa");
  });
});

describe("notifications-model: formatRemaining & deriveRuleStatus", () => {
  it("formatea cuentas regresivas correctamente", () => {
    const now = 1700000000000;
    expect(formatRemaining(new Date(now + 45000).toISOString(), now)).toBe("0:45");
    expect(formatRemaining(new Date(now + 125000).toISOString(), now)).toBe("2:05");
    expect(formatRemaining(new Date(now + 3700000).toISOString(), now)).toBe("1 h 1 min");
    expect(formatRemaining(new Date(now - 5000).toISOString(), now, "ahora")).toBe("ahora");
  });

  it("deriva estados de regla respetando la jerarquía de precedencia", () => {
    const rule: NotificationRule = {
      id: "rule_1",
      name: "Prueba Rack",
      enabled: true,
      source: { entity_id: "sensor.rack", display_name: "Rack" },
      condition: { type: "above", threshold: 30, for_seconds: 60, hysteresis: 0.5 },
      recipients: [{ name: "Pixel" }],
      message: { title: "T", body: "B" },
      behavior: { notification_mode: "once", reminder_interval_seconds: 0, notify_recovery: false },
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
    };

    // Sin runtime -> normal
    expect(deriveRuleStatus(rule).status).toBe("normal");

    // Deshabilitada gana sobre todo
    rule.enabled = false;
    rule.runtime = { active: true, sending: true, pending: true, last_error: null, last_sent: null, last_attempt: null, last_recovery: null, last_value: null, next_reminder_at: null, pending_since: null, pending_until: null, retry_at: null, retry_kind: null };
    expect(deriveRuleStatus(rule).status).toBe("disabled");

    // Habilitada con sending
    rule.enabled = true;
    expect(deriveRuleStatus(rule).status).toBe("sending");

    // Retry
    rule.runtime.sending = false;
    rule.runtime.retry_at = "2026-01-01T00:01:00Z";
    expect(deriveRuleStatus(rule).status).toBe("retry");

    // Active con recordatorio
    rule.runtime.retry_at = null;
    rule.runtime.next_reminder_at = "2026-01-01T00:30:00Z";
    expect(deriveRuleStatus(rule).status).toBe("alert");
    expect(deriveRuleStatus(rule).countdownType).toBe("reminder");

    // Pending
    rule.runtime.active = false;
    rule.runtime.next_reminder_at = null;
    rule.runtime.pending = true;
    rule.runtime.pending_until = "2026-01-01T00:05:00Z";
    expect(deriveRuleStatus(rule).status).toBe("pending");
    expect(deriveRuleStatus(rule).countdownType).toBe("pending");
  });
});
