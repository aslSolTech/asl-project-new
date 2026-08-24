import { createModalStore } from "@/stores/useGenericModalStore";
import { InactiveRecord } from "../types";

export const useInactiveModalStore = createModalStore<InactiveRecord>();
