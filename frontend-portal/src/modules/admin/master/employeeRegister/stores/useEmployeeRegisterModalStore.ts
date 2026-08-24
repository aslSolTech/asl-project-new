import { createModalStore } from "@/stores/useGenericModalStore";
import { EmployeeRegisterRecord } from "../types";

export const useEmployeeRegisterModalStore = createModalStore<EmployeeRegisterRecord>();
