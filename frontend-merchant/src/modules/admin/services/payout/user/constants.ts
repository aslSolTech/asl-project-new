export const userFieldsConfig = [
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
    label: "User",
    type: "select",
    placeholder: "Select User...",
    required: true,
    options: [],
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

