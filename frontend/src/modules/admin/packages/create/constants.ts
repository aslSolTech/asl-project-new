export const createFieldsConfig = [
  {
    key: "name",
    label: "Package Name",
    type: "text",
    placeholder: "Enter package name...",
    required: true
  },
  {
    key: "price",
    label: "Price",
    type: "text",
    placeholder: "Enter price...",
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
