export const systemSettingFieldsConfig = [
  {
    key: "settingKey",
    label: "Setting Key",
    type: "text",
    placeholder: "e.g. min_payout_limit",
    required: true
  },
  {
    key: "settingValue",
    label: "Setting Value",
    type: "text",
    placeholder: "e.g. 100",
    required: true
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Describe what this setting governs...",
    required: true
  }
] as const;
