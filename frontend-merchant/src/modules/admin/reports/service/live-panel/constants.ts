export const livePanelFieldsConfig = [
  {
    key: "metric",
    label: "Metric",
    type: "text",
    placeholder: "Enter metric...",
    required: true
  },
  {
    key: "value",
    label: "Value",
    type: "text",
    placeholder: "Enter value...",
    required: true
  },
  {
    key: "status",
    label: "Status",
    type: "text",
    placeholder: "Enter status...",
    required: true
  }
] as const;
