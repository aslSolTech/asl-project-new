import { createModalStore } from "@/stores/useGenericModalStore";
import { FailedRecord } from "../types";

export const useFailedModalStore = createModalStore<FailedRecord>();
