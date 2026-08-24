import { createModalStore } from "@/stores/useGenericModalStore";
import { CronSettingRecord } from "../types";

export const useCronSettingModalStore = createModalStore<CronSettingRecord>();
