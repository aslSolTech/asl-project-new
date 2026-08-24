import { createModalStore } from "@/stores/useGenericModalStore";
import { BbpsRecord } from "../types";

export const useBbpsModalStore = createModalStore<BbpsRecord>();
