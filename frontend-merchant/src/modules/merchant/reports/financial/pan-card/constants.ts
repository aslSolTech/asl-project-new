export const panCardFieldsConfig = [
  {
    key: "txId",
    label: "Transaction ID",
    type: "text",
    placeholder: "Enter transaction id...",
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
