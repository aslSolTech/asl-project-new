export const apiStatusFieldsConfig = [
  {
    key: "apiName",
    label: "API Name",
    type: "text",
    placeholder: "Payzones Status",
    required: true
  },
  {
    key: "endpoint",
    label: "Status Endpoint",
    type: "text",
    placeholder: "/v1/payout/status",
    required: true
  },
  {
    key: "method",
    label: "HTTP Method",
    type: "text",
    placeholder: "GET",
    required: true
  },
  {
    key: "successCode",
    label: "Success Code",
    type: "text",
    placeholder: "SUCCESS",
    required: true
  }
] as const;
