import { EmployeeRegisterFormInput } from "./validations";

export interface EmployeeRegisterFieldConfig {
  readonly key: keyof EmployeeRegisterFormInput;
  readonly label: string;
  readonly type: "text" | "email" | "tel" | "url" | "number" | "textarea" | "select";
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly textTransform?: "uppercase" | "lowercase" | "capitalize";
  readonly colSpan?: 1 | 2;
  readonly options?: readonly { readonly label: string; readonly value: string }[];
}

export const employeeRegisterFieldsConfig: readonly EmployeeRegisterFieldConfig[] = [
  {
    key: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "e.g. Rahul",
    required: true,
    textTransform: "capitalize",
    colSpan: 1,
  },
  {
    key: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "e.g. Sharma",
    required: true,
    textTransform: "capitalize",
    colSpan: 1,
  },
  {
    key: "mobile",
    label: "Mobile",
    type: "tel",
    placeholder: "e.g. 9876543210",
    required: true,
    colSpan: 1,
  },
  {
    key: "email",
    label: "Email ID",
    type: "email",
    placeholder: "e.g. rahul.sharma@payzones.com",
    required: true,
    textTransform: "lowercase",
    colSpan: 1,
  },
  {
    key: "address",
    label: "Address",
    type: "textarea",
    placeholder: "Enter full residential / office address",
    required: true,
    colSpan: 2,
  },
  {
    key: "isOtpVerify",
    label: "Is OTP Verify",
    type: "select",
    placeholder: "Select OTP Verification",
    required: true,
    colSpan: 1,
    options: [
      { label: "No (N)", value: "N" },
      { label: "Yes (Y)", value: "Y" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    placeholder: "Select Status",
    required: true,
    colSpan: 1,
    options: [
      { label: "Active", value: "Y" },
      { label: "Inactive", value: "N" },
    ],
  },
];

