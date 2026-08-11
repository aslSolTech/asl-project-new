export const employeePermissionFieldsConfig = [
  {
    key: "employeeId",
    label: "Employee ID",
    type: "text",
    placeholder: "EMP-001",
    required: true
  },
  {
    key: "moduleAccess",
    label: "Module Access",
    type: "text",
    placeholder: "Transactions",
    required: true
  },
  {
    key: "canWrite",
    label: "Can Write",
    type: "text",
    placeholder: "true",
    required: true
  },
  {
    key: "canDelete",
    label: "Can Delete",
    type: "text",
    placeholder: "false",
    required: true
  }
] as const;
