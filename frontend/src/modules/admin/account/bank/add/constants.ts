export const addFieldsConfig = [
  {
    key: "bankName",
    label: "Bank Name",
    type: "text",
    placeholder: "Enter bank name...",
    required: true,
    textTransform: "capitalize"
  },
  {
    key: "accountNumber",
    label: "Account Number",
    type: "text",
    placeholder: "Enter account number...",
    minLength: 9,
    maxLength: 20,
    inputMode: "numeric",
    required: true
  },
  {
    key: "branchName",
    label: "Branch Name",
    type: "text",
    placeholder: "Enter branch name...",
    required: true,
    textTransform: "capitalize"
  },
  {
    key: "ifscCode",
    label: "IFSC Code",
    type: "text",
    placeholder: "Enter ifsc code...",
    required: true,
    textTransform: "uppercase"
  },
  {
    key: "accountHolderName",
    label: "Account Holder Name",
    type: "text",
    placeholder: "Enter account holder name...",
    required: true,
    textTransform: "capitalize"
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ],
    required: true
  }
] as const;
