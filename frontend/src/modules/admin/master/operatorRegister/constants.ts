export const operatorRegisterFieldsConfig = [
  {
    key: "operatorName",
    label: "Operator Name",
    type: "text",
    placeholder: "Jio Prepaid",
    required: true
  },
  {
    key: "category",
    label: "Category Code",
    type: "text",
    placeholder: "Mobile Recharge",
    required: true
  },
  {
    key: "code",
    label: "Operator Shortcode",
    type: "text",
    placeholder: "JIO",
    required: true
  }
] as const;
