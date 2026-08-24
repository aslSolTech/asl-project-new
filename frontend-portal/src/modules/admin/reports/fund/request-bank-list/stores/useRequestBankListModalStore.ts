import { createModalStore } from "@/stores/useGenericModalStore";
import { RequestBankListRecord } from "../types";

export const useRequestBankListModalStore = createModalStore<RequestBankListRecord>();
