import { CompanyFormInput } from "./validations";

export interface CompanyFieldConfig {
  readonly key: keyof CompanyFormInput;
  readonly label: string;
  readonly type: "text" | "email" | "tel" | "url" | "textarea" | "file" | "number";
  readonly placeholder: string;
  readonly helperText?: string;
  readonly required?: boolean;
}

export const companySetupFieldsConfig: readonly CompanyFieldConfig[] = [
  {
    key: "companyLogo",
    label: "Company Logo",
    type: "file",
    placeholder: "e.g. Company Logo",
  },
  {
    key: "companyName",
    label: "Company Name",
    type: "text",
    placeholder: "e.g. Payzones Tech Solutions Pvt Ltd",
    required: true,
  },
  {
    key: "companyEmail",
    label: "Company Email",
    type: "email",
    placeholder: "e.g. info@payzones.com",
    required: true,
  },
  {
    key: "companyPhone",
    label: "Company Phone Number",
    type: "tel",
    placeholder: "e.g. +91 9876543210",
    required: true,
  },
  {
    key: "website",
    label: "Website URL",
    type: "url",
    placeholder: "https://payzones.com",
  },
  {
    key: "gstNumber",
    label: "GST Number",
    type: "text",
    placeholder: "e.g. 22AAAAA0000A1Z5",
  },
  {
    key: "address",
    label: "Registered Office Address",
    type: "textarea",
    placeholder: "Full registered address...",
    required: true,
  },
];
