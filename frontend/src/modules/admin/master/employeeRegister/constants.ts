export const employeeRegisterFieldsConfig = [
  {
    key: "name",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    required: true
  },
  {
    key: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@payzones.com",
    required: true
  },
  {
    key: "department",
    label: "Department",
    type: "text",
    placeholder: "Support",
    required: true
  },
  {
    key: "designation",
    label: "Designation",
    type: "text",
    placeholder: "L2 Support Executive",
    required: true
  }
] as const;
