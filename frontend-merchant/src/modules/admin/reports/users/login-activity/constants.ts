export const loginActivityFieldsConfig = [
  {
    key: "userId",
    label: "User ID",
    type: "text",
    placeholder: "Enter user id...",
    required: true
  },
  {
    key: "ip",
    label: "IP Address",
    type: "text",
    placeholder: "Enter ip address...",
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
