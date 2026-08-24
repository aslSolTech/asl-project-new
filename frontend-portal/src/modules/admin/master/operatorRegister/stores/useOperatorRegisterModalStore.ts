import { createModalStore } from "@/stores/useGenericModalStore";
import { OperatorRegisterRecord } from "../types";

export const useOperatorRegisterModalStore = createModalStore<OperatorRegisterRecord>();
