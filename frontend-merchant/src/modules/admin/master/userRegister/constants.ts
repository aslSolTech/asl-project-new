import { UserRegisterFormInput } from "./validations";

export interface UserFormFieldConfig {
  readonly key: keyof UserRegisterFormInput;
  readonly label: string;
  readonly type: "text" | "email" | "tel" | "url" | "number" | "textarea" | "select" | "date";
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly textTransform?: "uppercase" | "lowercase" | "capitalize";
  readonly colSpan?: 1 | 2;
  readonly optionsKey?: "userTypes" | "genders" | "isVerifies" | "packages" | "loginStatuses";
  readonly staticOptions?: readonly { readonly label: string; readonly value: string }[];
}

export interface UserFormSection {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly fields: readonly UserFormFieldConfig[];
}

export const userRegisterFormSections: readonly UserFormSection[] = [
  {
    id: "basic",
    title: "Basic Details",
    description: "Personal and primary account information",
    fields: [
      {
        key: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "e.g. Rahul",
        required: true,
        textTransform: "capitalize",
      },
      {
        key: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "e.g. Sharma",
        required: false,
        textTransform: "capitalize",
      },
      {
        key: "userTypeId",
        label: "User Type",
        type: "select",
        placeholder: "Select User Type",
        required: true,
        optionsKey: "userTypes",
      },
      {
        key: "companyName",
        label: "Company Name",
        type: "text",
        placeholder: "e.g. Rahul Tech Solutions",
        required: true,
        textTransform: "capitalize",
      },
      {
        key: "contactNo",
        label: "Contact No",
        type: "tel",
        placeholder: "10-digit mobile (e.g. 9876543210)",
        required: true,
      },
      {
        key: "whatsappNo",
        label: "WhatsApp No",
        type: "tel",
        placeholder: "10-digit WhatsApp number (optional)",
        required: false,
      },
      {
        key: "email",
        label: "Email ID",
        type: "email",
        placeholder: "e.g. rahul@example.com",
        required: true,
        textTransform: "lowercase",
      },
      {
        key: "dob",
        label: "Date of Birth",
        type: "date",
        placeholder: "YYYY-MM-DD",
        required: false,
      },
      {
        key: "gender",
        label: "Sex / Gender",
        type: "select",
        placeholder: "Select Gender",
        required: true,
        optionsKey: "genders",
        staticOptions: [
          { label: "Male", value: "MALE" },
          { label: "Female", value: "FEMALE" },
          { label: "Other", value: "OTHER" },
        ],
      },
      {
        key: "nationality",
        label: "Nationality",
        type: "text",
        placeholder: "e.g. Indian",
        required: false,
      },
    ],
  },
  {
    id: "address",
    title: "Address Details",
    description: "Physical location and statutory tax information",
    fields: [
      {
        key: "address",
        label: "Address",
        type: "textarea",
        placeholder: "Enter complete street address...",
        required: true,
        colSpan: 2,
      },
      {
        key: "landmark",
        label: "Landmark",
        type: "text",
        placeholder: "Near City Tower",
        required: false,
      },
      {
        key: "pinCode",
        label: "PIN No",
        type: "text",
        placeholder: "6-digit PIN code (e.g. 110001)",
        required: true,
      },
      {
        key: "isOtpVerify",
        label: "Is OTP Verify",
        type: "select",
        placeholder: "Select OTP Verification",
        required: true,
        optionsKey: "isVerifies",
        staticOptions: [
          { label: "Yes", value: "Y" },
          { label: "No", value: "N" },
        ],
      },
      {
        key: "loginStatus",
        label: "Login Status",
        type: "select",
        placeholder: "Select Login Status",
        required: true,
        optionsKey: "loginStatuses",
        staticOptions: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Blocked", value: "blocked" },
        ],
      },
    ],
  },
  {
    id: "other",
    title: "Other's Details",
    description: "Verification, identity and API routing details",
    fields: [
      {
        key: "gstNo",
        label: "GST Number",
        type: "text",
        placeholder: "15-digit GSTIN (optional)",
        required: false,
        textTransform: "uppercase",
      },
      {
        key: "aadhaarNo",
        label: "Aadhaar Number",
        type: "text",
        placeholder: "12-digit Aadhaar number",
        required: true,
      },
      {
        key: "panNo",
        label: "PAN No",
        type: "text",
        placeholder: "e.g. ABCDE1234F",
        required: true,
        textTransform: "uppercase",
      },
      {
        key: "userIpAddress",
        label: "User IP Address",
        type: "text",
        placeholder: "e.g. 192.168.1.1",
        required: false,
      },
      {
        key: "callbackUrl",
        label: "Callback URL",
        type: "url",
        placeholder: "https://yourdomain.com/callback",
        required: false,
      },
     
    ],
  },
  {
    id: "package",
    title: "Package Details",
    description: "Package assignment, balance limits and account state",
    fields: [
      {
        key: "packageId",
        label: "Select Package",
        type: "select",
        placeholder: "Select Package",
        required: true,
        optionsKey: "packages",
      },
      {
        key: "lockAmount",
        label: "Lock Amount",
        type: "number",
        placeholder: "0.00",
        required: false,
      },
    ],
  },
];
