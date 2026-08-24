import { createModalStore } from "@/stores/useGenericModalStore";
import { DistributorRequestsRecord } from "../types";

export const useDistributorRequestsModalStore = createModalStore<DistributorRequestsRecord>();
