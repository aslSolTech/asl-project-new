export const messagesFieldsConfig = [
  {
    key: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter name...",
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
