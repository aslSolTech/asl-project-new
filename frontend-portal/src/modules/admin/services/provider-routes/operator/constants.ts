export const operatorFieldsConfig = [
  {
    key: "operatorTypeId",
    label: "Operator Type",
    type: "select",
    placeholder: "Select Operator Type...",
    required: true,
  },
  {
    key: "operatorId",
    label: "Operator Name",
    type: "select",
    placeholder: "Select Operator...",
    required: true,
  },
  {
    key: "apiIds",
    label: "Select APIs (Multi-Select)",
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

