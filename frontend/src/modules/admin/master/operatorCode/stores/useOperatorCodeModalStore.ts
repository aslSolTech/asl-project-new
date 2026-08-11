import { createModalStore } from "@/stores/useGenericModalStore";
import { OperatorCodeRecord } from "../types";

export const useOperatorCodeModalStore = createModalStore<OperatorCodeRecord>();
