export const addMoneyFieldsConfig = [
  {
    key: "amount",
    label: "Amount",
    type: "text",
    placeholder: "Enter amount...",
    required: true
  },
  {
    key: "paymentMethod",
    label: "Payment Method",
    type: "text",
    placeholder: "Enter payment method...",
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
