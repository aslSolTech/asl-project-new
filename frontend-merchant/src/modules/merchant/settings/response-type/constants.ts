export const responseTypeFieldsConfig = [
  {
    key: "responseFormat",
    label: "Response Format",
    type: "text",
    placeholder: "e.g. JSON, XML, TEXT, HTML, CSV...",
    required: true,
    textTransform: "uppercase",
  },
] as const;

export const DEFAULT_RESPONSE_TYPES = [
  { id: "RSP-001", responseFormat: "JSON" },
  { id: "RSP-002", responseFormat: "XML" },
  { id: "RSP-003", responseFormat: "TEXT" },
  { id: "RSP-004", responseFormat: "CSV" },
];

export const DEFAULT_RESPONSE_PARAMS = [
  { id: "RSP-PAR-001", paramName: "Status Code", slug: "status_code" },
  { id: "RSP-PAR-002", paramName: "Response Message", slug: "message" },
  { id: "RSP-PAR-003", paramName: "Transaction ID", slug: "txn_id" },
  { id: "RSP-PAR-004", paramName: "Data Payload", slug: "data" },
];
