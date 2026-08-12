export const requestBankListFieldsConfig = [
  {
    key: "bankName",
    label: "Bank Name",
    type: "text",
    placeholder: "Enter bank name...",
    required: true
  },
  {
    key: "code",
    label: "Code",
    type: "text",
    placeholder: "Enter code...",
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
