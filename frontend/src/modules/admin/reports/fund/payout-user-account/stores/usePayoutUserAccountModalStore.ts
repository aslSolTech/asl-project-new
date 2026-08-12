import { createModalStore } from "@/stores/useGenericModalStore";
import { PayoutUserAccountRecord } from "../types";

export const usePayoutUserAccountModalStore = createModalStore<PayoutUserAccountRecord>();
