import { createModalStore } from "@/stores/useGenericModalStore";
import { CategoriesRecord } from "../types";

export const useCategoriesModalStore = createModalStore<CategoriesRecord>();
