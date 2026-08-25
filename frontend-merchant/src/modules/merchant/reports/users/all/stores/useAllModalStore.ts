import { createModalStore } from "@/stores/useGenericModalStore";
import { AllRecord } from "../types";

export const useAllModalStore = createModalStore<AllRecord>();
