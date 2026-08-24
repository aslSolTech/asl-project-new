import { FieldOption } from "@/components/form_builder/fields/FormFields";

export const isDefaultOptions: readonly FieldOption[] = [
  { label: "No", value: "N" },
  { label: "Yes", value: "Y" },
];

export const packageStatusOptions: readonly FieldOption[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const packageFieldsConfig = [
  {
    key: "packageName",
    label: "Package Name",
    type: "text" as const,
    placeholder: "Enter package name...",
    required: true,
  },
  {
    key: "trialPeriod",
    label: "Trial Periods (in days)",
    type: "number" as const,
    placeholder: "Enter trial periods in days...",
    required: true,
  },
  {
    key: "packageCharge",
    label: "Package Charge",
    type: "number" as const,
    placeholder: "Enter package charge...",
    required: true,
  },
  {
    key: "isDefault",
    label: "Is Default",
    type: "select" as const,
    placeholder: "Select default status...",
    required: true,
    options: isDefaultOptions,
  },
  {
    key: "status",
    label: "Status",
    type: "select" as const,
    placeholder: "Select status...",
    required: true,
    options: packageStatusOptions,
  },
] as const;
