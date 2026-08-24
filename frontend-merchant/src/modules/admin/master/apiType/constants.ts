export const apiTypeFieldsConfig = [
  {
    key: "typeName",
    label: "Type Name",
    type: "text",
    placeholder: "Payout API",
    required: true
  },
  {
    key: "code",
    label: "API Code",
    type: "text",
    placeholder: "PAYOUT",
    required: true
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Standard disbursement API type",
    required: true
  }
] as const;
