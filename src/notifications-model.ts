import type {
  ConditionType,
  NotificationBehavior,
  NotificationCondition,
  NotificationHelpTopic,
  NotificationMode,
  NotificationRule,
  NotificationRuleDraft,
} from "./notifications-types.js";

export function validateStep(step: number, draft: NotificationRuleDraft | null): string {
  if (!draft) return "No hay una regla en edición.";

  if (step === 1) {
    const entityId = String(draft.source?.entity_id || "").trim();
    if (!entityId) return "Selecciona un sensor de temperatura.";
    if (!entityId.startsWith("sensor.")) return "La entidad debe comenzar con sensor.*";
    return "";
  }

  if (step === 2) {
    const c = draft.condition;
    const kind = c.type;
    if (!["above", "below", "outside", "inside"].includes(kind)) {
      return "Tipo de condición no soportado.";
    }

    const h = Number(c.hysteresis);
    if (!Number.isFinite(h) || h < 0 || h > 50) {
      return "La histéresis debe ser un número entre 0 y 50 °C.";
    }

    const forSec = Number(c.for_seconds);
    if (!Number.isFinite(forSec) || forSec < 0 || forSec > 86400) {
      return "La duración debe estar entre 0 y 86 400 segundos (24 h).";
    }

    if (["above", "below"].includes(kind)) {
      const threshold = Number(c.threshold);
      if (!Number.isFinite(threshold)) return "Introduce un umbral de temperatura válido.";
    } else {
      const lower = Number(c.lower);
      const upper = Number(c.upper);
      if (!Number.isFinite(lower) || !Number.isFinite(upper)) {
        return "Introduce límites numéricos válidos para el rango.";
      }
      if (lower >= upper) {
        return "El límite inferior debe ser estrictamente menor al superior.";
      }
      if (kind === "outside" && h * 2 >= (upper - lower)) {
        return "La histéresis es demasiado grande para ese rango (debe ser menor a la mitad del intervalo).";
      }
    }

    const mode = draft.behavior?.notification_mode || "once";
    if (!["once", "repeat", "daily"].includes(mode)) {
      return "Frecuencia de avisos no soportada.";
    }
    if (mode === "repeat") {
      const reminderSec = Number(draft.behavior?.reminder_interval_seconds || 0);
      if (!Number.isFinite(reminderSec) || reminderSec < 60 || reminderSec > 604800) {
        return "Para repetir avisos, indica un intervalo de al menos 1 minuto.";
      }
    }
    return "";
  }

  if (step === 3) {
    const recipients = draft.recipients || [];
    if (!recipients.length) return "Selecciona al menos un dispositivo destinatario.";
    if (recipients.length > 25) return "Máximo 25 destinatarios por regla.";
    for (const r of recipients) {
      if (!r.notify_entity_id && !r.legacy_service) {
        return `El dispositivo ${r.name || "seleccionado"} no tiene entidad ni acción notify válida.`;
      }
    }
    return "";
  }

  if (step === 4) {
    const name = String(draft.name || "").trim();
    if (!name) return "La regla necesita un nombre interno.";
    if (name.length > 120) return "El nombre no puede superar los 120 caracteres.";

    const title = String(draft.message?.title || "").trim();
    if (title.length > 240) return "El título no puede superar los 240 caracteres.";

    const body = String(draft.message?.body || "").trim();
    if (!body) return "El mensaje de la notificación no puede quedar vacío.";
    if (body.length > 2000) return "El cuerpo del mensaje no puede superar los 2000 caracteres.";

    const recTitle = String(draft.message?.recovery_title || "").trim();
    if (recTitle.length > 240) return "El título de recuperación no puede superar los 240 caracteres.";

    const recBody = String(draft.message?.recovery_body || "").trim();
    if (recBody.length > 2000) return "El cuerpo de recuperación no puede superar los 2000 caracteres.";

    return "";
  }

  return "";
}

export function validateRuleDraft(draft: NotificationRuleDraft | null): { valid: boolean; step: number; error: string } {
  for (let s = 1; s <= 4; s++) {
    const err = validateStep(s, draft);
    if (err) return { valid: false, step: s, error: err };
  }
  return { valid: true, step: 0, error: "" };
}

export function normalizeDraft(draft: NotificationRuleDraft): Record<string, unknown> {
  const name = String(draft.name || "").trim();
  const c = draft.condition;
  const kind = c.type as ConditionType;
  const hysteresis = Math.max(0, Math.min(50, Number(c.hysteresis || 0)));
  const forSeconds = Math.max(0, Math.min(86400, Math.round(Number(c.for_seconds || 0))));

  const condition: Record<string, unknown> = {
    type: kind,
    hysteresis,
    for_seconds: forSeconds,
  };

  if (["above", "below"].includes(kind)) {
    condition.threshold = Number(c.threshold);
  } else {
    condition.lower = Number(c.lower);
    condition.upper = Number(c.upper);
  }

  const mode: NotificationMode = ["once", "repeat", "daily"].includes(draft.behavior.notification_mode)
    ? draft.behavior.notification_mode
    : "once";

  let reminderSeconds = 0;
  if (mode === "daily") reminderSeconds = 86400;
  else if (mode === "repeat") {
    reminderSeconds = Math.max(60, Math.min(604800, Math.round(Number(draft.behavior.reminder_interval_seconds || 1800))));
  }

  const recipients = (draft.recipients || []).map((r) => ({
    target_id: r.target_id || undefined,
    identity_keys: Array.isArray(r.identity_keys) ? [...r.identity_keys] : [],
    device_id: r.device_id || undefined,
    notify_entity_id: r.notify_entity_id || undefined,
    legacy_service: r.legacy_service || undefined,
    name: String(r.name || r.notify_entity_id || r.legacy_service || "Dispositivo"),
    custom_name: r.custom_name ? String(r.custom_name).trim() : null,
  }));

  const recoveryTitle = String(draft.message?.recovery_title || "").trim();
  const recoveryBody = String(draft.message?.recovery_body || "").trim();

  return {
    name,
    enabled: Boolean(draft.enabled),
    source: {
      entity_id: draft.source.entity_id,
      display_name: draft.source.display_name || draft.source.entity_id,
      area_name: draft.source.area_name || null,
    },
    condition,
    recipients,
    message: {
      title: String(draft.message.title || name).trim(),
      body: String(draft.message.body || "").trim(),
      recovery_title: recoveryTitle || null,
      recovery_body: recoveryBody || null,
    },
    behavior: {
      notification_mode: mode,
      reminder_interval_seconds: reminderSeconds,
      notify_recovery: Boolean(draft.behavior.notify_recovery),
    },
  };
}

export function conditionText(condition: Partial<NotificationCondition> | undefined): string {
  if (!condition) return "—";
  const c = condition;
  const dwell = Math.round((Number(c.for_seconds) || 0) / 60);
  const wait = dwell ? ` · ${dwell} min` : "";
  if (c.type === "above") return `≥ ${c.threshold ?? "—"} °C${wait}`;
  if (c.type === "below") return `≤ ${c.threshold ?? "—"} °C${wait}`;
  if (c.type === "outside") return `Fuera de ${c.lower ?? "—"}–${c.upper ?? "—"} °C${wait}`;
  if (c.type === "inside") return `Dentro de ${c.lower ?? "—"}–${c.upper ?? "—"} °C${wait}`;
  return "—";
}

export function conditionSummary(draft: NotificationRuleDraft | null): string {
  if (!draft) return "";
  const c = draft.condition;
  const sensor = draft.source?.display_name || draft.source?.entity_id || "El sensor";
  const minutes = Math.round(Number(c.for_seconds || 0) / 60);
  const duration = minutes ? ` durante ${minutes} minuto${minutes === 1 ? "" : "s"}` : "";
  const h = Number(c.hysteresis || 0);
  const mode = draft.behavior?.notification_mode || "once";

  let alerts = " Enviará un solo aviso por incidencia.";
  if (mode === "repeat") {
    const reminderMinutes = Math.max(1, Math.round(Number(draft.behavior?.reminder_interval_seconds || 1800) / 60));
    alerts = ` Mientras la incidencia siga activa, recordará cada ${reminderMinutes} minuto${reminderMinutes === 1 ? "" : "s"}.`;
  } else if (mode === "daily") {
    alerts = " Mientras la incidencia siga activa, enviará como máximo un recordatorio cada 24 horas.";
  }

  const recovery = draft.behavior?.notify_recovery
    ? " También avisará cuando la incidencia se considere resuelta."
    : "";
  const automaticRearm = " Después de resolverse, la regla queda lista automáticamente para detectar una incidencia nueva.";

  let base = "";
  if (c.type === "above") {
    base = `${sensor} activará la alerta al alcanzar o superar ${c.threshold} °C${duration}. Con una histéresis de ${h} °C, se considera resuelta a ${Number(c.threshold) - h} °C o menos.`;
  } else if (c.type === "below") {
    base = `${sensor} activará la alerta al alcanzar o bajar de ${c.threshold} °C${duration}. Con una histéresis de ${h} °C, se considera resuelta a ${Number(c.threshold) + h} °C o más.`;
  } else if (c.type === "outside") {
    base = `${sensor} activará la alerta al salir de ${c.lower}–${c.upper} °C${duration}. Con histéresis de ${h} °C, se considera resuelta al retornar al intervalo seguro.`;
  } else {
    base = `${sensor} activará la alerta al entrar en ${c.lower}–${c.upper} °C${duration}. Con histéresis de ${h} °C, se considera resuelta al salir del intervalo seguro.`;
  }

  return `${base}${alerts}${recovery}${automaticRearm}`;
}

export function reminderLabel(behavior?: Partial<NotificationBehavior>): string {
  const mode = behavior?.notification_mode || "once";
  if (mode === "once") return "Una vez por incidencia";
  if (mode === "daily") return "Cada 24 h mientras siga activa";
  const minutes = Math.max(1, Math.round(Number(behavior?.reminder_interval_seconds || 1800) / 60));
  return `Cada ${minutes} min mientras siga activa`;
}

export function formatRemaining(timestamp: string | null | undefined, nowMs: number, expiredText = "procesando…"): string {
  if (!timestamp) return "";
  const due = Date.parse(timestamp);
  if (!Number.isFinite(due)) return "";
  const remaining = Math.max(0, due - nowMs);
  if (remaining <= 0) return expiredText;

  const totalSeconds = Math.ceil(remaining / 1000);
  if (totalSeconds >= 3600) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} h ${minutes} min`;
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export interface RuleStatusDerivation {
  status: "disabled" | "sending" | "retry" | "alert" | "pending" | "normal";
  label: string;
  countdownType?: "pending" | "reminder" | "retry";
  countdownValue?: string | null;
}

export function deriveRuleStatus(rule: NotificationRule): RuleStatusDerivation {
  if (rule.enabled === false) {
    return { status: "disabled", label: "Deshabilitada" };
  }

  const runtime = rule.runtime;
  if (!runtime) {
    return { status: "normal", label: "En espera" };
  }

  if (runtime.sending) {
    const label = runtime.retry_kind === "reminder" ? "Enviando recordatorio…" : "Enviando alerta…";
    return { status: "sending", label };
  }

  if (runtime.retry_at) {
    const prefix = runtime.active ? "Alerta activa · " : "";
    return {
      status: "retry",
      label: `${prefix}Error de envío`,
      countdownType: "retry",
      countdownValue: runtime.retry_at,
    };
  }

  if (runtime.active) {
    if (runtime.next_reminder_at) {
      return {
        status: "alert",
        label: "Alerta activa",
        countdownType: "reminder",
        countdownValue: runtime.next_reminder_at,
      };
    }
    return { status: "alert", label: "Alerta activa" };
  }

  if (runtime.pending) {
    return {
      status: "pending",
      label: "Temporizando",
      countdownType: "pending",
      countdownValue: runtime.pending_until,
    };
  }

  return { status: "normal", label: "En espera" };
}

export function getHelpTopic(topic: string): NotificationHelpTopic | null {
  const topics: Record<string, NotificationHelpTopic> = {
    duration: {
      title: "¿Qué significa “Durante”?",
      text: "Es el tiempo que la condición debe mantenerse de forma continua antes del primer aviso.",
      example: "Ejemplo: ≥ 21 °C durante 2 min. Si llega a 21 °C pero baja antes de completar 2 minutos, no se envía nada y el conteo vuelve a empezar cuando alcance nuevamente 21 °C.",
    },
    hysteresis: {
      title: "¿Qué es la histéresis?",
      text: "Es un margen usado solo para decidir cuándo una incidencia ya terminó. Evita que una temperatura que oscila alrededor del umbral abra y cierre alertas repetidamente.",
      example: "Ejemplo: alerta ≥ 21 °C con histéresis 0,5 °C. La alerta empieza en 21 °C, pero no se considera resuelta hasta bajar a 20,5 °C o menos. Entre 20,5 y 21 °C sigue siendo la misma incidencia.",
    },
    frequency: {
      title: "Frecuencia de avisos",
      text: "La frecuencia solo controla qué ocurre después del primer aviso mientras la misma incidencia continúa activa.",
      example: "Una vez por incidencia: un solo aviso. Repetir: vuelve a avisar cada X minutos. Cada 24 h: si el problema sigue activo 24 horas después, envía otro recordatorio. Al resolverse, cualquier opción queda lista automáticamente para una incidencia nueva.",
    },
    recovery: {
      title: "Aviso al volver a la normalidad",
      text: "Es un mensaje adicional de cierre. No controla el rearme ni los recordatorios.",
      example: "Ejemplo: recibes una alerta por temperatura alta. Cuando baja hasta el valor de recuperación definido por la histéresis, puedes recibir otro mensaje indicando que la situación volvió a la normalidad. La regla queda rearmada automáticamente aunque esta opción esté desactivada.",
    },
  };
  return topics[topic] || null;
}
