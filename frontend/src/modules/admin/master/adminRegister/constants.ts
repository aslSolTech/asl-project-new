export const adminRegisterFieldsConfig = [
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
    placeholder: "admin@payzones.com",
    required: true
  },
  {
    key: "phone",
    label: "Phone Number",
    type: "text",
    placeholder: "+91 9999999999",
    required: true
  },
  {
    key: "role",
    label: "Admin Role",
    type: "text",
    placeholder: "Super Admin",
    required: true
  }
] as const;
