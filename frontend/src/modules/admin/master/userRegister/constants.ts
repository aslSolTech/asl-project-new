export const userRegisterFieldsConfig = [
  {
    key: "userName",
    label: "Username",
    type: "text",
    placeholder: "rahul_partner",
    required: true
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "rahul@gmail.com",
    required: true
  },
  {
    key: "mobile",
    label: "Mobile Number",
    type: "text",
    placeholder: "+91 9777666555",
    required: true
  },
  {
    key: "companyName",
    label: "Company Name",
    type: "text",
    placeholder: "Rahul Tech Solutions",
    required: true
  }
] as const;
