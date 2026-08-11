export const apiRequestParameterFieldsConfig = [
  {
    key: "paramName",
    label: "Parameter Name",
    type: "text",
    placeholder: "amount",
    required: true
  },
  {
    key: "dataType",
    label: "Data Type",
    type: "text",
    placeholder: "number",
    required: true
  },
  {
    key: "required",
    label: "Is Required",
    type: "text",
    placeholder: "true",
    required: true
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Transaction amount in INR",
    required: true
  }
] as const;
