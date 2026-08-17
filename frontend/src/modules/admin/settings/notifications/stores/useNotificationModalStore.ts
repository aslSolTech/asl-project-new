import { createModalStore } from "@/stores/useGenericModalStore";
import { NotificationRecord } from "../types";

export const useNotificationModalStore = createModalStore<NotificationRecord>();
