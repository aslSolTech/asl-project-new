export const TRANSACTION_TYPE_OPTIONS = [
  { label: "Service", value: "service" },
  { label: "Fund", value: "fund" },
  { label: "Website", value: "website" },
  { label: "Others", value: "others" },
] as const;

export const messagesFieldsConfig = [
  {
    key: "transactionType",
    label: "Transaction Type",
    type: "select",
    placeholder: "Select transaction type...",
    required: true,
    options: TRANSACTION_TYPE_OPTIONS,
  },
  {
    key: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Write your message here...",
    required: true,
    rows: 4,
  },
] as const;
