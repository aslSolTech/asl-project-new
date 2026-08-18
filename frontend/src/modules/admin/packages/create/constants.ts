import { FieldOption } from "@/components/form_builder/fields/FormFields";

export const isDefaultOptions: readonly FieldOption[] = [
  { label: "No", value: "N" },
  { label: "Yes", value: "Y" },
];

export const packageStatusOptions: readonly FieldOption[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const createFieldsConfig = [
  {
    key: "packageName",
    label: "Package Name",
    type: "text",
    placeholder: "Enter package name...",
    required: true,
  },
  {
    key: "trialPeriod",
    label: "Trial Periods (in days)",
    type: "number",
    placeholder: "Enter trial periods in days...",
    required: true,
  },
  {
    key: "packageCharge",
    label: "Package Charge",
    type: "number",
    placeholder: "Enter package charge...",
    required: true,
  },
  {
    key: "isDefault",
    label: "Is Default",
    type: "select",
    placeholder: "Select default status...",
    required: true,
    options: isDefaultOptions,
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status...",
    required: true,
    options: packageStatusOptions,
  },
] as const;
