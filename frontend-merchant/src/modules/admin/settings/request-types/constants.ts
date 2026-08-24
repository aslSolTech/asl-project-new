export const HTTP_METHOD_OPTIONS = [
  { label: "POST", value: "POST" },
  { label: "GET", value: "GET" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
  { label: "PATCH", value: "PATCH" },
];

export const PARAM_DATA_TYPES = [
  { label: "String", value: "String" },
  { label: "Number", value: "Number" },
  { label: "Boolean", value: "Boolean" },
  { label: "Object (JSON)", value: "Object" },
  { label: "Array", value: "Array" },
];

export const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const IS_REQUIRED_OPTIONS = [
  { label: "Yes (Required)", value: "true" },
  { label: "No (Optional)", value: "false" },
];

export const DEFAULT_REQUEST_TYPES = [
  { id: "REQ-001", typeName: "Authenticate User", requestCode: "AUTH_USER", httpMethod: "POST", status: "active" },
  { id: "REQ-002", typeName: "Check Balance", requestCode: "FETCH_BAL", httpMethod: "GET", status: "active" },
  { id: "REQ-003", typeName: "Create Transaction", requestCode: "CREATE_TXN", httpMethod: "POST", status: "active" },
  { id: "REQ-004", typeName: "Query Status", requestCode: "QUERY_STATUS", httpMethod: "POST", status: "active" },
];

export const DEFAULT_REQUEST_PARAMS = [
  { id: "PAR-001", paramName: "Username", slug: "username" },
  { id: "PAR-002", paramName: "Password", slug: "password" },
  { id: "PAR-003", paramName: "Amount", slug: "amount" },
  { id: "PAR-004", paramName: "Callback URL", slug: "callback_url" },
];

export const DEFAULT_PARAM_STATUSES = [
  { id: "PST-001", statusName: "Success / OK", statusCode: "SUCCESS", status: "active" },
  { id: "PST-002", statusName: "Pending Validation", statusCode: "PENDING", status: "active" },
  { id: "PST-003", statusName: "Invalid Parameter", statusCode: "INVALID_PARAM", status: "active" },
  { id: "PST-004", statusName: "Authentication Failed", statusCode: "AUTH_FAIL", status: "active" },
];
