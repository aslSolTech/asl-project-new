import { createModalStore } from "@/stores/useGenericModalStore";
import { DmtDashboardRecord } from "../types";

export const useDmtDashboardModalStore = createModalStore<DmtDashboardRecord>();
