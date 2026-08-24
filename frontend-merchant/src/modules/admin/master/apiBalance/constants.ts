export const apiBalanceFieldsConfig = [
  {
    key: "provider",
    label: "Provider Name",
    type: "text",
    placeholder: "Payzones",
    required: true
  },
  {
    key: "endpoint",
    label: "Balance Endpoint",
    type: "text",
    placeholder: "/v1/balance",
    required: true
  },
  {
    key: "currency",
    label: "Currency Code",
    type: "text",
    placeholder: "INR",
    required: true
  }
] as const;
