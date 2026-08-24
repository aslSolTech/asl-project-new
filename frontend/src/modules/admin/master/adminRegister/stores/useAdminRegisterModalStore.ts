import { createModalStore } from "@/stores/useGenericModalStore";
import { AdminRegisterRecord } from "../types";

export const useAdminRegisterModalStore = createModalStore<AdminRegisterRecord>();
