import { createModalStore } from "@/stores/useGenericModalStore";
import { CallbacksRecord } from "../types";

export const useCallbacksModalStore = createModalStore<CallbacksRecord>();
