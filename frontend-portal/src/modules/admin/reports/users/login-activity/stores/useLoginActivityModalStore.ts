import { createModalStore } from "@/stores/useGenericModalStore";
import { LoginActivityRecord } from "../types";

export const useLoginActivityModalStore = createModalStore<LoginActivityRecord>();
