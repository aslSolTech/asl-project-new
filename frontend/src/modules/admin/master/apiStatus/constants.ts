export const statusForOptions = [
  { label: "Payout", value: "payout" },
  { label: "Collection", value: "collection" },
  { label: "BBPS", value: "bbps" },
  { label: "Recharge", value: "recharge" },
  { label: "Verification", value: "verification" },
] as const;

export interface ApiStatusFieldConfig {
  readonly key: string;
  readonly label: string;
  readonly type: "text" | "email" | "tel" | "url" | "number" | "textarea" | "select";
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly textTransform?: "uppercase" | "lowercase" | "capitalize";
  readonly colSpan?: 1 | 2;
}

