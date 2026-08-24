import { createModalStore } from "@/stores/useGenericModalStore";
import { AepsDashboardRecord } from "../types";

export const useAepsDashboardModalStore = createModalStore<AepsDashboardRecord>();
