export const balanceFieldsConfig = [
  {
    key: "balance",
    label: "Balance",
    type: "text",
    placeholder: "Enter balance...",
    required: true
  },
  {
    key: "currency",
    label: "Currency",
    type: "text",
    placeholder: "Enter currency...",
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
