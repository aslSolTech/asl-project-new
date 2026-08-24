export const payoutFieldsConfig = [
  {
    key: "service",
    label: "Service",
    type: "text",
    placeholder: "Enter service...",
    required: true
  },
  {
    key: "api",
    label: "API Partner",
    type: "text",
    placeholder: "Enter api partner...",
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
