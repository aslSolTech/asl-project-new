import { createModalStore } from "@/stores/useGenericModalStore";
import { RequestTypeRecord, RequestParamRecord, ParamStatusRecord } from "../types";

export const useRequestTypeModalStore = createModalStore<RequestTypeRecord>();
export const useRequestParamModalStore = createModalStore<RequestParamRecord>();
export const useParamStatusModalStore = createModalStore<ParamStatusRecord>();
