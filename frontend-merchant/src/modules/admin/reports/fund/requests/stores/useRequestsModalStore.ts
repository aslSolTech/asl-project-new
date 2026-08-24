import { createModalStore } from "@/stores/useGenericModalStore";
import { RequestsRecord } from "../types";

export const useRequestsModalStore = createModalStore<RequestsRecord>();
