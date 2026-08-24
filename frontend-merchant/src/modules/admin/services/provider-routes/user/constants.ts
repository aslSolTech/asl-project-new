export const userFieldsConfig = [
  {
    key: "userTypeId",
    label: "User Type",
    type: "select",
    placeholder: "Select User Type...",
    required: true,
  },
  {
    key: "userId",
    label: "User",
    type: "select",
    placeholder: "Select User...",
    required: true,
  },
  {
    key: "apiIds",
    label: "Select Routing APIs (Multi-Select)",
    type: "combobox-multi",
    placeholder: "Select Routing APIs...",
    required: true,
  },
  {
    key: "fallback",
    label: "Fallback",
    type: "select",
    placeholder: "Select fallback status...",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
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

