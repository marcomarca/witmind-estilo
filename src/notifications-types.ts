export type NotificationMode = "once" | "repeat" | "daily";
export type ConditionType = "above" | "below" | "outside" | "inside";

export interface NotificationRuntime {
  active: boolean;
  pending: boolean;
  pending_since: string | null;
  pending_until: string | null;
  sending: boolean;
  last_sent: string | null;
  last_attempt: string | null;
  last_recovery: string | null;
  last_value: number | string | null;
  last_error: string | null;
  next_reminder_at: string | null;
  retry_at: string | null;
  retry_kind: "alert" | "reminder" | null;
}

export interface NotificationSource {
  entity_id: string;
  display_name: string;
  area_name?: string | null;
}

export interface NotificationCondition {
  type: ConditionType;
  threshold?: number;
  lower?: number;
  upper?: number;
  for_seconds: number;
  hysteresis: number;
}

export interface NotificationRecipient {
  target_id?: string;
  identity_keys?: string[];
  device_id?: string;
  notify_entity_id?: string;
  legacy_service?: string;
  name: string;
  custom_name?: string | null;
  status?: string;
  available?: boolean;
}

export interface NotificationMessage {
  title: string;
  body: string;
  recovery_title?: string | null;
  recovery_body?: string | null;
}

export interface NotificationBehavior {
  notification_mode: NotificationMode;
  reminder_interval_seconds: number;
  notify_recovery: boolean;
}

export interface NotificationRule {
  id: string;
  name: string;
  enabled: boolean;
  source: NotificationSource;
  condition: NotificationCondition;
  recipients: NotificationRecipient[];
  message: NotificationMessage;
  behavior: NotificationBehavior;
  runtime?: NotificationRuntime;
  created_at: string;
  updated_at: string;
}

export interface NotificationTarget {
  target_id: string;
  identity_keys: string[];
  key: string;
  name: string;
  ha_name?: string;
  custom_name?: string | null;
  available: boolean;
  device_id?: string;
  notify_entity_id?: string;
  legacy_service?: string;
  manufacturer?: string;
  model?: string;
  sw_version?: string;
  area_name?: string;
}

export interface NotificationSensor {
  entity_id: string;
  name: string;
  display_name?: string;
  area_name?: string | null;
  device_name?: string | null;
  unit?: string;
  value?: number | null;
  raw_value?: string;
  available: boolean;
  preferred?: boolean;
  preferredIndex?: number;
}

export interface NotificationHistoryEvent {
  timestamp: string;
  event_type: "alert" | "reminder" | "recovery" | "test" | string;
  status: "sent" | "error" | string;
  rule_id?: string | null;
  rule_name?: string | null;
  sensor_entity_id?: string | null;
  sensor_name?: string | null;
  value?: number | string | null;
  recipient?: string | null;
  target?: string | null;
  error?: string | null;
}

export interface NotificationRuleDraft {
  name: string;
  enabled: boolean;
  source: NotificationSource;
  condition: {
    type: ConditionType;
    threshold: number | string;
    lower: number | string;
    upper: number | string;
    for_seconds: number;
    hysteresis: number | string;
  };
  recipients: NotificationRecipient[];
  message: {
    title: string;
    body: string;
    recovery_title?: string;
    recovery_body?: string;
  };
  behavior: {
    notification_mode: NotificationMode;
    reminder_interval_seconds: number;
    notify_recovery: boolean;
  };
}

export interface NotificationHelpTopic {
  title: string;
  text: string;
  example: string;
}
