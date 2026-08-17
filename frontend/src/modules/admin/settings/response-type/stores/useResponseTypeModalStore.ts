import { createModalStore } from "@/stores/useGenericModalStore";
import { ResponseTypeRecord } from "../types";

export const useResponseTypeModalStore = createModalStore<ResponseTypeRecord>();
