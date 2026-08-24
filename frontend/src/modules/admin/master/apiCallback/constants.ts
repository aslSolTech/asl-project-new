export const apiCallbackFieldsConfig = [
  {
    key: "customerName",
    label: "Customer Name",
    type: "text",
    placeholder: "Rahul Tech Solutions",
    required: true
  },
  {
    key: "url",
    label: "Callback URL",
    type: "text",
    placeholder: "https://webhook.site/rahul-tech",
    required: true
  },
  {
    key: "retryPolicy",
    label: "Retry Policy Rule",
    type: "text",
    placeholder: "Max 3 retries",
    required: true
  }
] as const;
