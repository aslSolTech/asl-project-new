import { createModalStore } from "@/stores/useGenericModalStore";
import { UserLedgerRecord } from "../types";

export const useUserLedgerModalStore = createModalStore<UserLedgerRecord>();
