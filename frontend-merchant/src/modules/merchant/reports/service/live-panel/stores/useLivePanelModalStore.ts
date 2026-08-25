import { createModalStore } from "@/stores/useGenericModalStore";
import { LivePanelRecord } from "../types";

export const useLivePanelModalStore = createModalStore<LivePanelRecord>();
