import { createModalStore } from "@/stores/useGenericModalStore";
import { GenderRecord } from "../types";

export const useGenderModalStore = createModalStore<GenderRecord>();
