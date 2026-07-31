export const SIGNUP_DEFAULT_VALUES = {
  companyName: "",
  businessType: "",
  taxId: "",
  companyEmail: "",
  companyPhone: "",
  adminFullName: "",
  adminUserId: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
};

export const BUSINESS_TYPES = [
  { label: "Sole Proprietorship", value: "sole_proprietorship" },
  { label: "Partnership Firm", value: "partnership" },
  { label: "Private Limited (Pvt Ltd)", value: "pvt_ltd" },
  { label: "Public Limited", value: "public_ltd" },
  { label: "Limited Liability Partnership (LLP)", value: "llp" },
  { label: "Retailer / Individual Agent", value: "retailer" },
  { label: "Distributor Network", value: "distributor" },
  { label: "Whitelabel Partner", value: "whitelabel" },
];

export const SIGNUP_MESSAGES = {
  TITLE: "Register Company Account",
  SUBTITLE: "Join Payzones network and expand your financial services business",
  SUCCESS_REDIRECT_DELAY_MS: 1200,
};
