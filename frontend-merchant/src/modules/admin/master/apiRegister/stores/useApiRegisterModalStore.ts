import { createModalStore } from "@/stores/useGenericModalStore";
import { ApiRegisterRecord } from "../types";

export const useApiRegisterModalStore = createModalStore<ApiRegisterRecord>();
