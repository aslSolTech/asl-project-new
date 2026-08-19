export const defaultOperatorTypes = [
  { label: "Mobile Prepaid", value: "mobile_prepaid" },
  { label: "Mobile Postpaid", value: "mobile_postpaid" },
  { label: "DTH", value: "dth" },
  { label: "Electricity", value: "electricity" },
  { label: "Fastag", value: "fastag" },
  { label: "Broadband", value: "broadband" },
  { label: "LPG Gas", value: "lpg_gas" },
  { label: "Water", value: "water" },
  { label: "AEPS", value: "aeps" },
  { label: "DMT", value: "dmt" },
  { label: "Payout", value: "payout" },
] as const;

export const defaultConnectionTypes = [
  { label: "Prepaid", value: "Prepaid" },
  { label: "Postpaid", value: "Postpaid" },
  { label: "BBPS", value: "BBPS" },
  { label: "Direct API", value: "Direct API" },
  { label: "Offline", value: "Offline" },
] as const;

export const isFlatOptions = [
  { label: "No (Percentage %)", value: "No" },
  { label: "Yes (Flat Amount ₹)", value: "Yes" },
] as const;

export const fallbackApiList = [
  { id: "API-001", apiName: "Payzones Payout API", apiType: "payout" },
  { id: "API-002", apiName: "Eko Recharge API", apiType: "mobile_prepaid" },
  { id: "API-003", apiName: "Paysprint Recharge API", apiType: "mobile_prepaid" },
  { id: "API-004", apiName: "BillDesk BBPS API", apiType: "electricity" },
  { id: "API-005", apiName: "Sprint DTH API", apiType: "dth" },
] as const;

