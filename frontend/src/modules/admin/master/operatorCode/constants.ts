export const operatorCodeFieldsConfig = [
  {
    key: "provider",
    label: "Provider Name",
    type: "text",
    placeholder: "Payzones Payout",
    required: true
  },
  {
    key: "operator",
    label: "Operator Name",
    type: "text",
    placeholder: "Jio Prepaid",
    required: true
  },
  {
    key: "code",
    label: "Internal Code",
    type: "text",
    placeholder: "JIOPRE",
    required: true
  },
  {
    key: "providerCode",
    label: "Provider Match Code",
    type: "text",
    placeholder: "JIO_IND_PRE",
    required: true
  }
] as const;
