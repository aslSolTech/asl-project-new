import { SettingsRecord } from "./types";

export const SERVICE_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
] as const;

export const settingsFieldsConfig = [
  {
    key: "serviceIcon",
    label: "Service Icon",
    type: "file",
    required: false,
    placeholder: "Upload Icon / Avatar",
  },
  {
    key: "serviceType",
    label: "Service Type",
    type: "select",
    placeholder: "Select Service Type",
    required: true,
  },
  {
    key: "serviceName",
    label: "Service Name",
    type: "text",
    placeholder: "e.g. Mobile Prepaid, Electricity Bill...",
    required: true,
  },
  {
    key: "shortDesc",
    label: "Short Description",
    type: "text",
    placeholder: "Enter short description of the service...",
    required: false,
  },
  {
    key: "linkPage",
    label: "Link Page",
    type: "text",
    placeholder: "e.g. /services/recharge or https://...",
    required: true,
  },
  {
    key: "serviceOrder",
    label: "Service Order",
    type: "text",
    placeholder: "e.g. 1, 2, 3...",
    required: true,
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    required: true,
    options: SERVICE_STATUS_OPTIONS,
  },
] as const;

export const INITIAL_SERVICE_SETTINGS: SettingsRecord[] = [
  {
    id: "SRV-001",
    serviceIcon: "https://api.dicebear.com/7.x/shapes/svg?seed=AEPS",
    serviceType: "AEPS",
    serviceName: "AePS Cash Withdrawal",
    shortDesc: "Aadhaar Enabled Payment System for biometric cash withdrawal & balance enquiry",
    linkPage: "/services/aeps",
    serviceOrder: "1",
    status: "active",
  },
  {
    id: "SRV-002",
    serviceIcon: "https://api.dicebear.com/7.x/shapes/svg?seed=Recharge",
    serviceType: "Mobile Recharge",
    serviceName: "Prepaid Mobile Recharge",
    shortDesc: "Instant online recharge for all major telecom operators across India",
    linkPage: "/services/mobile-recharge",
    serviceOrder: "2",
    status: "active",
  },
  {
    id: "SRV-003",
    serviceIcon: "https://api.dicebear.com/7.x/shapes/svg?seed=DTH",
    serviceType: "DTH Recharge",
    serviceName: "DTH Bill Payment & Recharge",
    shortDesc: "Quick DTH payments for Tata Play, Airtel DTH, Dish TV, and more",
    linkPage: "/services/dth-recharge",
    serviceOrder: "3",
    status: "active",
  },
  {
    id: "SRV-004",
    serviceIcon: "https://api.dicebear.com/7.x/shapes/svg?seed=Electricity",
    serviceType: "Electricity",
    serviceName: "Electricity Bill Payment",
    shortDesc: "Pay electricity bills across all state boards with BBPS integration",
    linkPage: "/services/electricity",
    serviceOrder: "4",
    status: "active",
  },
  {
    id: "SRV-005",
    serviceIcon: "https://api.dicebear.com/7.x/shapes/svg?seed=MoneyTransfer",
    serviceType: "Money Transfer",
    serviceName: "Domestic Money Transfer (DMT)",
    shortDesc: "24x7 instant IMPS / NEFT money transfer to any bank in India",
    linkPage: "/services/dmt",
    serviceOrder: "5",
    status: "active",
  },
];
