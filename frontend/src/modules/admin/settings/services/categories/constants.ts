import { CategoriesRecord } from "./types";

export const CATEGORIES_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
] as const;

export const categoriesFieldsConfig = [
  {
    key: "categoryName",
    label: "Service Type / Category Name",
    type: "text",
    placeholder: "e.g. AEPS, Mobile Recharge, Electricity...",
    required: true,
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    required: true,
    options: CATEGORIES_STATUS_OPTIONS,
  },
] as const;

export const INITIAL_SERVICE_CATEGORIES: CategoriesRecord[] = [
  { id: "CAT-001", categoryName: "AEPS", status: "active" },
  { id: "CAT-002", categoryName: "Cash Deposit", status: "active" },
  { id: "CAT-003", categoryName: "CMS", status: "active" },
  { id: "CAT-004", categoryName: "CREDIT CARD", status: "active" },
  { id: "CAT-005", categoryName: "DTH Recharge", status: "active" },
  { id: "CAT-006", categoryName: "Electricity", status: "active" },
  { id: "CAT-007", categoryName: "Fastag Recharge", status: "active" },
  { id: "CAT-008", categoryName: "Gas Booking", status: "active" },
  { id: "CAT-009", categoryName: "Google Play", status: "active" },
  { id: "CAT-010", categoryName: "INSURANCE", status: "active" },
  { id: "CAT-011", categoryName: "LANDLINE", status: "active" },
  { id: "CAT-012", categoryName: "LIC BILL PAYMENT", status: "active" },
  { id: "CAT-013", categoryName: "LOAN PAYMENT", status: "active" },
  { id: "CAT-014", categoryName: "LPG Booking", status: "active" },
  { id: "CAT-015", categoryName: "MOBILE POSTPAID", status: "active" },
  { id: "CAT-016", categoryName: "Mobile Recharge", status: "active" },
  { id: "CAT-017", categoryName: "Money Transfer", status: "active" },
  { id: "CAT-018", categoryName: "NSDL PAN", status: "active" },
  { id: "CAT-019", categoryName: "Others", status: "active" },
];
