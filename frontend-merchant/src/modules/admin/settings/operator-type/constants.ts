export const operatorTypeFieldsConfig = [
  {
    key: "operatorType",
    label: "Operator Type",
    type: "text",
    placeholder: "e.g. Prepaid Mobile, Postpaid, DTH, Electricity, Fastag...",
    required: true,
  },
  {
    key: "apiType",
    label: "API Type",
    type: "select",
    placeholder: "Select API Type...",
    required: true,
    options: [
      { label: "Recharge", value: "Recharge" },
      { label: "Bill Payment", value: "Bill Payment" },
      { label: "DMT (Money Transfer)", value: "DMT" },
      { label: "AEPS", value: "AEPS" },
      { label: "Payout", value: "Payout" },
      { label: "Verification API", value: "Verification API" },
      { label: "PAN Card", value: "PAN Card" },
      { label: "Insurance", value: "Insurance" },
      { label: "Fastag", value: "Fastag" },
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

export const DEFAULT_OPERATOR_TYPES = [
  { id: "OPT-001", operatorType: "Prepaid Mobile", apiType: "Recharge", status: "active" },
  { id: "OPT-002", operatorType: "DTH", apiType: "Recharge", status: "active" },
  { id: "OPT-003", operatorType: "Electricity Bill", apiType: "Bill Payment", status: "active" },
  { id: "OPT-004", operatorType: "Fastag Recharge", apiType: "Fastag", status: "active" },
  { id: "OPT-005", operatorType: "Bank Transfer", apiType: "Payout", status: "active" },
];
