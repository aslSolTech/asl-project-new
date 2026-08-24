import { createModalStore } from "@/stores/useGenericModalStore";
import { HeaderRecord } from "../types";

export const useHeaderModalStore = createModalStore<HeaderRecord>();
