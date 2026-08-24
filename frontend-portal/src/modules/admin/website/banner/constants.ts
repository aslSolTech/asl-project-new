export const bannerFieldsConfig = [
  {
    key: "title",
    label: "Banner Title",
    type: "text",
    placeholder: "Enter banner title...",
    required: true
  },
  {
    key: "imageUrl",
    label: "Image URL",
    type: "text",
    placeholder: "Enter image url...",
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
