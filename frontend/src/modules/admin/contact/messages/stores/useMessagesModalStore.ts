import { createModalStore } from "@/stores/useGenericModalStore";
import { MessagesRecord } from "../types";

export const useMessagesModalStore = createModalStore<MessagesRecord>();
