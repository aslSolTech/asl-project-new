import { createModalStore } from "@/stores/useGenericModalStore";
import { EmployeePermissionRecord } from "../types";

export const useEmployeePermissionModalStore = createModalStore<EmployeePermissionRecord>();
