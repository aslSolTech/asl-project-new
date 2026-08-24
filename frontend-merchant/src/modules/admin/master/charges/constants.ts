export const registrationChargesFieldsConfig = [
  {
    key: "planName",
    label: "Plan Name",
    type: "text",
    placeholder: "Retailer Join Plan",
    required: true
  },
  {
    key: "userType",
    label: "Target User Type",
    type: "text",
    placeholder: "Retailer",
    required: true
  },
  {
    key: "amount",
    label: "Charge Amount (INR)",
    type: "text",
    placeholder: "199.00",
    required: true
  }
] as const;
