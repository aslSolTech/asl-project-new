import { createModalStore } from "@/stores/useGenericModalStore";
import { ResponseTypeRecord, ResponseParamRecord } from "../types";

export const useResponseTypeModalStore = createModalStore<ResponseTypeRecord>();
export const useResponseParamModalStore = createModalStore<ResponseParamRecord>();
