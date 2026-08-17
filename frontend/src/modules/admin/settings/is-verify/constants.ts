export const isVerifyFieldsConfig = [
  {
    key: "name",
    label: "Verification Option Name",
    type: "text",
    placeholder: "e.g. Verified / Yes / No / Pending...",
    required: true,
  },
  {
    key: "value",
    label: "Verification Value / Flag",
    type: "text",
    placeholder: "e.g. true / false / YES / NO...",
    required: true,
  },
] as const;

export const DEFAULT_IS_VERIFY = [
  { id: "VER-001", name: "Yes (Verified)", value: "true" },
  { id: "VER-002", name: "No (Unverified)", value: "false" },
  { id: "VER-003", name: "Pending Review", value: "pending" },
];
