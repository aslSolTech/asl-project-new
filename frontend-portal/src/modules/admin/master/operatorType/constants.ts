export const operatorTypeFieldsConfig = [
  {
    key: "typeName",
    label: "Operator Type Name",
    type: "text",
    placeholder: "Prepaid Mobile",
    required: true
  },
  {
    key: "code",
    label: "Operator Code",
    type: "text",
    placeholder: "PREPAID",
    required: true
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Mobile prepaid services",
    required: true
  }
] as const;
