import { FieldOption } from "@/components/form_builder/fields/FormFields";

export const commissionStatusOptions: readonly FieldOption[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const commissionFieldsConfig = [
  {
    key: "packageName",
    label: "Package Name",
    type: "text" as const,
    placeholder: "Enter package name...",
    required: true,
  },
  {
    key: "rate",
    label: "Rate",
    type: "text" as const,
    placeholder: "Enter rate...",
    required: true,
  },
  {
    key: "status",
    label: "Status",
    type: "select" as const,
    placeholder: "Select status...",
    required: true,
    options: commissionStatusOptions,
  },
] as const;
