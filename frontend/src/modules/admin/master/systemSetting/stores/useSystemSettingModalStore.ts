import { createModalStore } from "@/stores/useGenericModalStore";
import { SystemSettingRecord } from "../types";

export const useSystemSettingModalStore = createModalStore<SystemSettingRecord>();
