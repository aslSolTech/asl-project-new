import { createModalStore } from "@/stores/useGenericModalStore";
import { OperatorRecord } from "../types";

export const useOperatorModalStore = createModalStore<OperatorRecord>();
