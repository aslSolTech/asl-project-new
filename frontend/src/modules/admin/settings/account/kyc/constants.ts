export const kycFieldsConfig = [
  {
    key: "documentType",
    label: "Doc Type",
    type: "text",
    placeholder: "Enter doc type...",
    required: true
  },
  {
    key: "docNumber",
    label: "Number",
    type: "text",
    placeholder: "Enter number...",
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
