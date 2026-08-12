export const menuFieldsConfig = [
  {
    key: "name",
    label: "Menu Name",
    type: "text",
    placeholder: "Enter menu name...",
    required: true
  },
  {
    key: "link",
    label: "Link URL",
    type: "text",
    placeholder: "Enter link url...",
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
