export const developmentTypeOptions = [
  { label: "Admin", value: "admin" },
  { label: "Developer", value: "developer" },
] as const;

export interface ApiRegisterFieldConfig {
  readonly key: string;
  readonly label: string;
  readonly type: "text" | "email" | "tel" | "url" | "number" | "textarea" | "select";
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly textTransform?: "uppercase" | "lowercase" | "capitalize";
  readonly colSpan?: 1 | 2;
}
