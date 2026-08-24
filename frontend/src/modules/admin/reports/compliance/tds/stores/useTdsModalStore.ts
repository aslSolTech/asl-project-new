import { createModalStore } from "@/stores/useGenericModalStore";
import { TdsRecord } from "../types";

export const useTdsModalStore = createModalStore<TdsRecord>();
