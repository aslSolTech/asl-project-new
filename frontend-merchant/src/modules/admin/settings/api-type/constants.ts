import { ApiTypeRecord } from "./types";

export const DEFAULT_API_TYPES: ApiTypeRecord[] = [
  {
    id: "APT-001",
    apiType: "Recharge",
    requestParams: ["PAR-001", "PAR-003"],
    responseParams: ["RSP-PAR-001", "RSP-PAR-002", "RSP-PAR-003"],
    walletType: "prepaid",
    isDisplayPdf: true,
  },
  {
    id: "APT-002",
    apiType: "Bill Payment",
    requestParams: ["PAR-001", "PAR-003", "PAR-004"],
    responseParams: ["RSP-PAR-001", "RSP-PAR-002", "RSP-PAR-003", "RSP-PAR-004"],
    walletType: "utility",
    isDisplayPdf: true,
  },
  {
    id: "APT-003",
    apiType: "DMT (Money Transfer)",
    requestParams: ["PAR-001", "PAR-002", "PAR-003"],
    responseParams: ["RSP-PAR-001", "RSP-PAR-002", "RSP-PAR-003"],
    walletType: "bank",
    isDisplayPdf: true,
  },
  {
    id: "APT-004",
    apiType: "AEPS",
    requestParams: ["PAR-001", "PAR-003"],
    responseParams: ["RSP-PAR-001", "RSP-PAR-003"],
    walletType: "bank",
    isDisplayPdf: false,
  },
];
