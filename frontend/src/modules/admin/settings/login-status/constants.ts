export const loginStatusFieldsConfig = [
  {
    key: "statusName",
    label: "Status Name",
    type: "text",
    placeholder: "e.g. Active, Inactive, Suspended, Locked...",
    required: true,
  },
  {
    key: "value",
    label: "Status Value",
    type: "text",
    placeholder: "e.g. true, false, active, blocked...",
    required: true,
  },
] as const;

export const DEFAULT_LOGIN_STATUSES = [
  { id: "LOG-001", statusName: "Active", value: "true" },
  { id: "LOG-002", statusName: "Inactive", value: "false" },
  { id: "LOG-003", statusName: "Suspended", value: "suspended" },
  { id: "LOG-004", statusName: "Locked", value: "locked" },
];
