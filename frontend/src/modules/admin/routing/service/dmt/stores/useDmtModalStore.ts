import { createModalStore } from "@/stores/useGenericModalStore";
import { DmtRecord } from "../types";

export const useDmtModalStore = createModalStore<DmtRecord>();
