import { createModalStore } from "@/stores/useGenericModalStore";
import { UpiVerifyRecord } from "../types";

export const useUpiVerifyModalStore = createModalStore<UpiVerifyRecord>();
