import { createModalStore } from "@/stores/useGenericModalStore";
import { ArticlesRecord } from "../types";

export const useArticlesModalStore = createModalStore<ArticlesRecord>();
