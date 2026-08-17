import { createModalStore } from "@/stores/useGenericModalStore";
import { LoginStatusRecord } from "../types";

export const useLoginStatusModalStore = createModalStore<LoginStatusRecord>();
