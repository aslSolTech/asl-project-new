import { createModalStore } from "@/stores/useGenericModalStore";
import { KycRecord } from "../types";

export const useKycModalStore = createModalStore<KycRecord>();
