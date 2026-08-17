export const responseTypeFieldsConfig = [
  {
    key: "responseFormat",
    label: "Response Format",
    type: "text",
    placeholder: "e.g. JSON, XML, TEXT, HTML, CSV...",
    required: true,
    textTransform: "uppercase",
  },
  {
    key: "code",
    label: "Response Code Identifier",
    type: "text",
    placeholder: "e.g. RES_JSON, RES_XML...",
    required: true,
    textTransform: "uppercase",
  },
] as const;

export const DEFAULT_RESPONSE_TYPES = [
  { id: "RSP-001", responseFormat: "JSON", code: "RES_JSON" },
  { id: "RSP-002", responseFormat: "XML", code: "RES_XML" },
  { id: "RSP-003", responseFormat: "TEXT", code: "RES_TEXT" },
  { id: "RSP-004", responseFormat: "CSV", code: "RES_CSV" },
];
