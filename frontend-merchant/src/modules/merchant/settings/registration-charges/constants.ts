export const registrationChargesFieldsConfig = [
  {
    key: "userType",
    label: "User Type / Role",
    type: "select",
    placeholder: "Select User Type...",
    required: true,
    options: [
      { label: "Retailer", value: "Retailer" },
      { label: "Distributor", value: "Distributor" },
      { label: "Master Distributor", value: "Master Distributor" },
      { label: "API User", value: "API User" },
      { label: "White Label Partner", value: "White Label Partner" },
    ],
  },
  {
    key: "registerAmount",
    label: "Registration Amount (₹)",
    type: "number",
    placeholder: "e.g. 500, 1000, 0...",
    required: true,
  },
  {
    key: "displayStatus",
    label: "Display Status",
    type: "select",
    placeholder: "Select display status...",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
] as const;

export const DEFAULT_REGISTRATION_CHARGES = [
  { id: "REG-001", userType: "Retailer", registerAmount: "500", displayStatus: "active" },
  { id: "REG-002", userType: "Distributor", registerAmount: "1500", displayStatus: "active" },
  { id: "REG-003", userType: "Master Distributor", registerAmount: "3000", displayStatus: "active" },
  { id: "REG-004", userType: "API User", registerAmount: "5000", displayStatus: "active" },
];
