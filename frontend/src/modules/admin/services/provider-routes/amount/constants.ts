export const WHERE_CONDITIONS = [
  { label: "==", value: "==" },
  { label: ">=", value: ">=" },
  { label: "<=", value: "<=" },
  { label: "<>", value: "<>" },
  { label: ">", value: ">" },
  { label: "<", value: "<" },
  { label: "AND", value: "AND" },
  { label: "BETWEEN", value: "BETWEEN" },
] as const;

export const amountFieldsConfig = [
  {
    key: "condition",
    label: "WHERE (Condition)",
    type: "select",
    placeholder: "Select operator...",
    required: true,
    options: WHERE_CONDITIONS,
  },
  {
    key: "amountFrom",
    label: "Amount (₹)",
    type: "number",
    placeholder: "e.g. 500",
    required: true,
  },
  {
    key: "amountTo",
    label: "To Amount (₹)",
    type: "number",
    placeholder: "e.g. 5000 (for BETWEEN/AND)",
    required: false,
  },
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

