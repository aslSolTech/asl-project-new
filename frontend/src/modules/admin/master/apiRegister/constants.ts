export const apiRegisterFieldsConfig = [
  {
    key: "apiName",
    label: "API Name",
    type: "text",
    placeholder: "Payzones Payout",
    required: true
  },
  {
    key: "provider",
    label: "Provider",
    type: "text",
    placeholder: "Payzones",
    required: true
  },
  {
    key: "url",
    label: "Endpoint URL",
    type: "text",
    placeholder: "https://api.payzones.com/v1/payout",
    required: true
  },
  {
    key: "apiType",
    label: "API Type Code",
    type: "text",
    placeholder: "PAYOUT",
    required: true
  }
] as const;
