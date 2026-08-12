import { createModalStore } from "@/stores/useGenericModalStore";
import { AddMoneyRecord } from "../types";

export const useAddMoneyModalStore = createModalStore<AddMoneyRecord>();
