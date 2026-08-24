import { createModalStore } from "@/stores/useGenericModalStore";
import { AdminTransferRecord } from "../types";

export const useAdminTransferModalStore = createModalStore<AdminTransferRecord>();
