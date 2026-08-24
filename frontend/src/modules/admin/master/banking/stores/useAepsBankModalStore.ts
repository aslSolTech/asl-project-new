import { createModalStore } from "@/stores/useGenericModalStore";
import { AepsBankRecord } from "../types";

export const useAepsBankModalStore = createModalStore<AepsBankRecord>();
