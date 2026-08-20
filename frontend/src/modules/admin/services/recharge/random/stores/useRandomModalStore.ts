import { createModalStore } from "@/stores/useGenericModalStore";
import { RandomRecord } from "../types";

export const useRandomModalStore = createModalStore<RandomRecord>();
