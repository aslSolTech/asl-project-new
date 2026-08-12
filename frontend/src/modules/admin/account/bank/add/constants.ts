export const addFieldsConfig = [
  {
    key: "bankName",
    label: "Bank Name",
    type: "text",
    placeholder: "Enter bank name...",
    required: true
  },
  {
    key: "accountNumber",
    label: "Account Number",
    type: "text",
    placeholder: "Enter account number...",
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
