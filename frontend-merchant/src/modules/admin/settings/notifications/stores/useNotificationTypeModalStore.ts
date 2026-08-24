import { createModalStore } from "@/stores/useGenericModalStore";
import { NotificationTypeRecord } from "../types";

export const useNotificationTypeModalStore = createModalStore<NotificationTypeRecord>();
