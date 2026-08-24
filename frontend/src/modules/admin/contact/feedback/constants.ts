export const feedbackFieldsConfig = [
  {
    key: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter name...",
    required: true
  },
  {
    key: "feedback",
    label: "Feedback",
    type: "text",
    placeholder: "Enter feedback...",
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
