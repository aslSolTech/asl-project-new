import { CompanyFormInput } from "./validations";

export interface CompanyFieldConfig {
  readonly key: keyof CompanyFormInput;
  readonly label: string;
  readonly type: "text" | "email" | "tel" | "url" | "textarea" | "file" | "number" | "date";
  readonly placeholder: string;
  readonly helperText?: string;
  readonly required?: boolean;
  readonly textTransform?: "uppercase" | "lowercase" | "capitalize";
  readonly section?: "basic" | "dates" | "address" | "contact" | "statutory";
}

export const companySetupFieldsConfig: readonly CompanyFieldConfig[] = [
  // Basic Identity
  {
    key: "companyName",
    label: "Company Name",
    type: "text",
    placeholder: "e.g. Payzones Tech Solutions Pvt Ltd",
    required: true,
    textTransform: "capitalize",
    section: "basic",
  },
  {
    key: "printName",
    label: "Print Name",
    type: "text",
    placeholder: "e.g. PAYZONES TECH SOLUTIONS",
    required: true,
    textTransform: "uppercase",
    section: "basic",
  },
  {
    key: "billnoPrefix",
    label: "Bill No Prefix",
    type: "text",
    placeholder: "e.g. INV-2026-",
    required: true,
    textTransform: "uppercase",
    section: "basic",
  },

  // Accounting & Operation Dates
  {
    key: "beginingFrom",
    label: "Beginning From",
    type: "date",
    placeholder: "YYYY-MM-DD",
    required: true,
    section: "dates",
  },
  {
    key: "commencingFrom",
    label: "Commencing From",
    type: "date",
    placeholder: "YYYY-MM-DD",
    section: "dates",
  },

  // Address & Geography
  {
    key: "address1",
    label: "Address (1)",
    type: "text",
    placeholder: "Building / Street / Line 1",
    required: true,
    section: "address",
  },
  {
    key: "address2",
    label: "Address (2)",
    type: "text",
    placeholder: "Area / Landmark / Line 2",
    section: "address",
  },
  {
    key: "address3",
    label: "Address (3)",
    type: "text",
    placeholder: "City / Pin Code / Line 3",
    section: "address",
  },
  {
    key: "country",
    label: "Country",
    type: "text",
    placeholder: "e.g. India",
    required: true,
    textTransform: "capitalize",
    section: "address",
  },
  {
    key: "state",
    label: "State",
    type: "text",
    placeholder: "e.g. Maharashtra",
    required: true,
    textTransform: "capitalize",
    section: "address",
  },

  // Communication & Contacts
  {
    key: "contactNumber1",
    label: "Contact Number (1)",
    type: "tel",
    placeholder: "e.g. +91 9876543210",
    required: true,
    section: "contact",
  },
  {
    key: "contactNumber2",
    label: "Contact Number (2)",
    type: "tel",
    placeholder: "e.g. +91 9123456780",
    section: "contact",
  },
  {
    key: "callbackNumber",
    label: "Callback Number",
    type: "tel",
    placeholder: "e.g. 1800-123-4567",
    section: "contact",
  },
  {
    key: "landNumber",
    label: "Land Number",
    type: "tel",
    placeholder: "e.g. 022-26543210",
    section: "contact",
  },
  {
    key: "emailForService",
    label: "Email ID For Service",
    type: "email",
    placeholder: "e.g. service@payzones.com",
    textTransform: "lowercase",
    section: "contact",
  },
  {
    key: "emailForInvoice",
    label: "Email ID For Invoice",
    type: "email",
    placeholder: "e.g. billing@payzones.com",
    textTransform: "lowercase",
    section: "contact",
  },
  {
    key: "website",
    label: "Website",
    type: "url",
    placeholder: "https://payzones.com",
    textTransform: "lowercase",
    section: "contact",
  },
  {
    key: "faxNo",
    label: "Fax No",
    type: "text",
    placeholder: "e.g. +1 123 456 7890",
    section: "contact",
  },

  // Tax, Legal & Statutory
  {
    key: "tinNo",
    label: "TIN No",
    type: "text",
    placeholder: "e.g. 27123456789",
    textTransform: "uppercase",
    section: "statutory",
  },
  {
    key: "cstNo",
    label: "CST No",
    type: "text",
    placeholder: "e.g. CST12345678",
    textTransform: "uppercase",
    section: "statutory",
  },
  {
    key: "taxNo",
    label: "Tax No",
    type: "text",
    placeholder: "e.g. TAX-897654",
    textTransform: "uppercase",
    section: "statutory",
  },
  {
    key: "panNo",
    label: "PAN No",
    type: "text",
    placeholder: "e.g. ABCDE1234F",
    textTransform: "uppercase",
    section: "statutory",
  },
  {
    key: "cinNo",
    label: "CIN No",
    type: "text",
    placeholder: "e.g. U72900MH2020PTC123456",
    textTransform: "uppercase",
    section: "statutory",
  },
  {
    key: "gstNo",
    label: "GST No",
    type: "text",
    placeholder: "e.g. 22AAAAA0000A1Z5",
    required: true,
    textTransform: "uppercase",
    section: "statutory",
  },
  {
    key: "gstPer",
    label: "GST Per (%)",
    type: "number",
    placeholder: "e.g. 18",
    required: true,
    section: "statutory",
  },
  {
    key: "declaration",
    label: "Declaration",
    type: "textarea",
    placeholder: "We declare that this invoice shows the actual price of the goods / services described and that all particulars are true and correct.",
    section: "statutory",
  },
];
