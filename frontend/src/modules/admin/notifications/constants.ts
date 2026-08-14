export const notificationFieldsConfig = [
  {
    key: "title",
    label: "Notification Title",
    type: "text",
    placeholder: "Enter notification title...",
    required: true
  },
  {
    key: "message",
    label: "Message",
    type: "text",
    placeholder: "Enter message...",
    required: true
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    required: true,
    options: [
      { value: "", label: "Select Status" },
      { value: "1", label: "Active" },
      { value: "0", label: "Inactive" },
    ],
  },
] as const;
