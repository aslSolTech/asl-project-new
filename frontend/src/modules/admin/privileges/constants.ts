export const privilegesFieldsConfig = [
  {
    key: "role",
    label: "Role",
    type: "text",
    placeholder: "Enter role...",
    required: true
  },
  {
    key: "access",
    label: "Access Level",
    type: "text",
    placeholder: "Enter access level...",
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
