import { createModalStore } from "@/stores/useGenericModalStore";
import { UserAmountRecord } from "../types";

export const useUserAmountModalStore = createModalStore<UserAmountRecord>();
