import { createModalStore } from "@/stores/useGenericModalStore";
import { MissionRecord } from "../types";

export const useMissionModalStore = createModalStore<MissionRecord>();
