import { createModalStore } from "@/stores/useGenericModalStore";
import { OperatorCategoryRecord } from "../types";

export const useOperatorCategoryModalStore = createModalStore<OperatorCategoryRecord>();
