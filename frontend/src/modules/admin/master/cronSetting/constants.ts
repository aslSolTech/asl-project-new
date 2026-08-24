export const cronSettingFieldsConfig = [
  {
    key: "cronName",
    label: "Cron Name",
    type: "text",
    placeholder: "e.g. Transaction Requery",
    required: true
  },
  {
    key: "schedule",
    label: "Schedule",
    type: "text",
    placeholder: "e.g. */5 * * * *",
    required: true
  },
  {
    key: "endpoint",
    label: "Target Endpoint",
    type: "text",
    placeholder: "e.g. /cron/requery",
    required: true
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    placeholder: "E.g. Pulls status of pending transactions",
    required: true
  }
] as const;
