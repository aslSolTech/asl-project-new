import { createModalStore } from "@/stores/useGenericModalStore";
import { PanCardRecord } from "../types";

export const usePanCardModalStore = createModalStore<PanCardRecord>();
