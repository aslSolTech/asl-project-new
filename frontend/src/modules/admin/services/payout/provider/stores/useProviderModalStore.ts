import { createModalStore } from "@/stores/useGenericModalStore";
import { ProviderRecord } from "../types";

export const useProviderModalStore = createModalStore<ProviderRecord>();
