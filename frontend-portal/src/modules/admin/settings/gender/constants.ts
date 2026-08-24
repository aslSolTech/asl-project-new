export const genderFieldsConfig = [
  {
    key: "genderName",
    label: "Gender Name",
    type: "text",
    placeholder: "e.g. Male, Female, Other...",
    required: true,
  },
  {
    key: "code",
    label: "Gender Code / Slug",
    type: "text",
    placeholder: "e.g. MALE, FEMALE, OTHER...",
    required: true,
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status...",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
] as const;

export const DEFAULT_GENDERS = [
  { id: "GEN-001", genderName: "Male", code: "MALE", status: "active" },
  { id: "GEN-002", genderName: "Female", code: "FEMALE", status: "active" },
  { id: "GEN-003", genderName: "Other", code: "OTHER", status: "active" },
];
