import { createModalStore } from "@/stores/useGenericModalStore";
import { AepsRecord } from "../types";

export const useAepsModalStore = createModalStore<AepsRecord>();
