export const dailySaleFieldsConfig = [
  {
    key: "date",
    label: "Date",
    type: "text",
    placeholder: "Enter date...",
    required: true
  },
  {
    key: "sales",
    label: "Sales",
    type: "text",
    placeholder: "Enter sales...",
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
