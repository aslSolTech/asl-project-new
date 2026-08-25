import { Variants } from "framer-motion";

export const LOGIN_DEFAULT_VALUES = {
  userId: "",
  password: "",
  rememberMe: false,
};

export const LOGIN_MESSAGES = {
  TITLE: "Welcome Back",
  SUBTITLE: "Enter your User ID and password to access your account",
  SUCCESS_REDIRECT_DELAY_MS: 1000,
};

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
  SUBTITLE: "Join ASL Wallets network and expand your financial services business",
  SUCCESS_REDIRECT_DELAY_MS: 1200,
};

export const FORGOT_PASSWORD_DEFAULT_VALUES = {
  userId: "",
};

export const FORGOT_PASSWORD_MESSAGES = {
  TITLE: "Forgot Password",
  SUBTITLE: "Enter your User ID to receive a verification OTP code for resetting your password",
  SUCCESS_REDIRECT_DELAY_MS: 1200,
};

export const OTP_VERIFICATION_DEFAULT_VALUES = {
  otpCode: "",
};

export const OTP_TIMER_INITIAL_SECONDS = 60;

export const OTP_VERIFICATION_MESSAGES = {
  TITLE: "OTP Verification",
  SUBTITLE: "Enter the 6-digit security code sent to your registered User ID",
  SUCCESS_REDIRECT_DELAY_MS: 1500,
};

export const MERCHANT_ROLES = [
  { label: "Retailer", value: "retailer", description: "Agent / Retail Counter" },
  { label: "Distributor", value: "distributor", description: "Channel Partner / Distributor" },
  { label: "Super Distributor", value: "superdistributor", description: "Master Network Partner" },
] as const;

export type MerchantRole = (typeof MERCHANT_ROLES)[number]["value"];

export const RESET_PASSWORD_DEFAULT_VALUES = {
  userId: "",
  role: "retailer" as MerchantRole,
  otpCode: "",
  newPassword: "",
  confirmPassword: "",
};

export const RESET_PASSWORD_MESSAGES = {
  TITLE: "Reset Password",
  SUBTITLE: "Create a new secure password for your merchant account",
  SUCCESS_REDIRECT_DELAY_MS: 1500,
};


export const FORM_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
      delayChildren: 0,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const FORM_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

