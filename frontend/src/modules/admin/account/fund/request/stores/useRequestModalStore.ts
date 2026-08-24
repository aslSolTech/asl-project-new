import { createModalStore } from "@/stores/useGenericModalStore";
import { RequestRecord } from "../types";

export const useRequestModalStore = createModalStore<RequestRecord>();
