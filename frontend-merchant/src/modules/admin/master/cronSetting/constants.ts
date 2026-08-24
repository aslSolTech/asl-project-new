import { CronSettingRecord } from "./types";

export interface CronSettingFieldConfig {
  readonly key: "cronName" | "schedule" | "endpoint" | "description" | "isActive";
  readonly label: string;
  readonly type: "text" | "textarea" | "switch" | "checkbox" | "select";
  readonly placeholder?: string;
  readonly required?: boolean;
}

export const cronSettingFieldsConfig: readonly CronSettingFieldConfig[] = [
  {
    key: "cronName",
    label: "Cron Name",
    type: "text",
    placeholder: "e.g. Transaction Requery",
    required: true,
  },
  {
    key: "schedule",
    label: "Schedule",
    type: "text",
    placeholder: "e.g. */5 * * * *",
    required: true,
  },
  {
    key: "endpoint",
    label: "Target Endpoint",
    type: "text",
    placeholder: "e.g. /cron/requery",
    required: true,
  },
  {
    key: "isActive",
    label: "Active Status",
    type: "switch",
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    placeholder: "E.g. Pulls status of pending transactions",
    required: true,
  },
  
] as const;

/**
 * Predefined Cron Services List with default Active / Inactive status
 * Includes DMT, UPI, AEPS, BBPS, Recharge, PAN, Payout, etc.
 */
export const DEFAULT_CRON_SETTING_LIST: readonly CronSettingRecord[] = [
  {
    id: "CRN-DMT-001",
    cronName: "DMT Transaction Requery",
    serviceKey: "dmt",
    schedule: "*/5 * * * *",
    endpoint: "/cron/dmt/status-check",
    description: "Automated status enquiry and reconciliation for pending Domestic Money Transfer transactions",
    isActive: true,
  },
  {
    id: "CRN-UPI-002",
    cronName: "UPI Callback & Settlement",
    serviceKey: "upi",
    schedule: "*/2 * * * *",
    endpoint: "/cron/upi/settlement-check",
    description: "Syncs real-time UPI collection payments and pending VPA transactions",
    isActive: true,
  },
  {
    id: "CRN-AEPS-003",
    cronName: "AEPS Transaction Sync",
    serviceKey: "aeps",
    schedule: "*/10 * * * *",
    endpoint: "/cron/aeps/sync-status",
    description: "Checks 2-way status with banking switch for pending AePS Cash Withdrawals",
    isActive: true,
  },
  {
    id: "CRN-BBPS-004",
    cronName: "BBPS Bill Fetch & Payment Status",
    serviceKey: "bbps",
    schedule: "0 */1 * * *",
    endpoint: "/cron/bbps/verify-status",
    description: "Periodic validation of utility bill payments submitted through Bharat BillPay",
    isActive: false,
  },
  {
    id: "CRN-RCH-005",
    cronName: "Recharge Pending Requery",
    serviceKey: "recharge",
    schedule: "*/3 * * * *",
    endpoint: "/cron/recharge/requery",
    description: "Automatic retry and operator confirmation for pending Mobile / DTH recharges",
    isActive: true,
  },
  {
    id: "CRN-PAN-006",
    cronName: "PAN Card Application Status",
    serviceKey: "pan",
    schedule: "0 */6 * * *",
    endpoint: "/cron/pan/check-status",
    description: "Fetches UTIITSL / NSDL application processing status updates for submitted tokens",
    isActive: false,
  },
  {
    id: "CRN-PAY-007",
    cronName: "Payout Batch Processing",
    serviceKey: "payout",
    schedule: "*/1 * * * *",
    endpoint: "/cron/payout/process-queue",
    description: "Triggers IMPS/NEFT/RTGS instant vendor payout batch queue",
    isActive: true,
  },
  {
    id: "CRN-WAL-008",
    cronName: "Wallet Reconciliation & Audit",
    serviceKey: "wallet",
    schedule: "0 0 * * *",
    endpoint: "/cron/wallet/daily-reconciliation",
    description: "Nightly ledger validation and balance ledger sanity audit",
    isActive: true,
  },
] as const;
