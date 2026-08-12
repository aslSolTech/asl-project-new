export const transferFieldsConfig = [
  {
    key: "recipient",
    label: "Recipient",
    type: "text",
    placeholder: "Enter recipient...",
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
