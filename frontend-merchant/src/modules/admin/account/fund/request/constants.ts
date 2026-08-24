export const requestFieldsConfig = [
  {
    key: "bankName",
    label: "Bank",
    type: "text",
    placeholder: "Enter bank...",
    required: true
  },
  {
    key: "amount",
    label: "Amount",
    type: "text",
    placeholder: "Enter amount...",
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
