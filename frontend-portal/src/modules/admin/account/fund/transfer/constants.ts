export const transferFieldsConfig = [
  {
    key: "apiUserId",
    label: "API User",
    type: "select",
    placeholder: "Select API User",
    options: [{ label: "Level 1", value: 1 }, { label: "Level 2", value: 2 }],
    required: true
  },
  {
    key: "trxnDate",
    label: "Trxn Date",
    type: "date",
    placeholder: "Select Trxn Date",
    required: true
  },
  {
    key: "transferType",
    label: "Transfer Type",
    type: "select",
    placeholder: "Select Transfer Type",
    options: [{ label: "Transfer", value: "transfer" }, { label: "Withdraw", value: "withdraw" }],
    required: true
  },
  {
    key: "walletType",
    label: "Wallet Type",
    type: "select",
    textTransform: "capitalize",
    placeholder: "Select Wallet Type",
    options: [
      {
        label: "Bank",
        value: "bank"
      },
      {
        label: "Prepaid",
        value: "prepaid"
      },
      {
        label: "SMS",
        value: "sms"
      },
      {
        label: "Travel",
        value: "travel"
      },
      {
        label: "Utility",
        value: "utility"
      }
    ],
    required: true
  },
  {
    key: "amount",
    label: "Amount",
    type: "number",
    placeholder: "Enter amount...",
    required: true
  }
] as const;
