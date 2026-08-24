import { createModalStore } from "@/stores/useGenericModalStore";
import { RollbackRecord } from "../types";

export const useRollbackModalStore = createModalStore<RollbackRecord>();
