import { createModalStore } from "@/stores/useGenericModalStore";
import { TransferRecord } from "../types";

export const useTransferModalStore = createModalStore<TransferRecord>();
