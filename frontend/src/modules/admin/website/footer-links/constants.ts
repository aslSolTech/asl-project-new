export const footerLinksFieldsConfig = [
  {
    key: "name",
    label: "Link Name",
    type: "text",
    placeholder: "Enter link name...",
    required: true
  },
  {
    key: "url",
    label: "URL",
    type: "text",
    placeholder: "Enter url...",
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
