import { createModalStore } from "@/stores/useGenericModalStore";
import { AepsLogsRecord } from "../types";

export const useAepsLogsModalStore = createModalStore<AepsLogsRecord>();
