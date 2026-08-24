import { createModalStore } from "@/stores/useGenericModalStore";
import { PrivilegeRecord } from "../types";

export const usePrivilegeModalStore = createModalStore<PrivilegeRecord>();
