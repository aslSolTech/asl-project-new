export const listFieldsConfig = [
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
    type: "text",
    placeholder: "Enter status...",
    required: true
  }
] as const;
