export const amountFieldsConfig = [
  {
    key: "userTypeId",
    label: "User Type",
    type: "select",
    placeholder: "Select User Type...",
    required: true,
    options: [],
  },
  {
    key: "providerName",
    label: "Provider Name (Payout Service)",
    type: "select",
    placeholder: "Select Payout Provider API...",
    required: true,
    options: [],
  },
  {
    key: "userId",
    label: "User (Optional / Specific User)",
    type: "select",
    placeholder: "All Users of this User Type (Default)",
    required: false,
    options: [],
  },
  {
    key: "amountFrom",
    label: "Amount From (Min Amount)",
    type: "number",
    placeholder: "e.g. 1.00",
    required: true,
  },
  {
    key: "amountTo",
    label: "Amount To (Max Amount)",
    type: "number",
    placeholder: "e.g. 50000.00",
    required: true,
  },
  
  {
    key: "fallback",
    label: "Fallback Provider",
    type: "select",
    placeholder: "Select Fallback Provider (Optional)...",
    required: false,
    options: [],
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

