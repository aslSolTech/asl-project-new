import { createModalStore } from "@/stores/useGenericModalStore";
import { SettingsRecord } from "../types";

export const useSettingsModalStore = createModalStore<SettingsRecord>();
