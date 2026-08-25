import { createModalStore } from "@/stores/useGenericModalStore";
import { OperatorTypeRecord } from "../types";

export const useOperatorTypeModalStore = createModalStore<OperatorTypeRecord>();
