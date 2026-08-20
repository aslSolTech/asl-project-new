import { createModalStore } from "@/stores/useGenericModalStore";
import { MerchantApiRecord } from "../types";

export const useMerchantApiModalStore = createModalStore<MerchantApiRecord>();
