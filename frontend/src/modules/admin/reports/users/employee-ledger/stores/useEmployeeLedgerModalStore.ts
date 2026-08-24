import { createModalStore } from "@/stores/useGenericModalStore";
import { EmployeeLedgerRecord } from "../types";

export const useEmployeeLedgerModalStore = createModalStore<EmployeeLedgerRecord>();
