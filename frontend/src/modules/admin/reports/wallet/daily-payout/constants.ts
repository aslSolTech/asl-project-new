export const dailyPayoutFieldsConfig = [
  {
    key: "date",
    label: "Date",
    type: "text",
    placeholder: "Enter date...",
    required: true
  },
  {
    key: "payouts",
    label: "Payouts",
    type: "text",
    placeholder: "Enter payouts...",
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
