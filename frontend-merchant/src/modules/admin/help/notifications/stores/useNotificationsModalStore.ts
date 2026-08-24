import { createModalStore } from "@/stores/useGenericModalStore";
import { NotificationsRecord } from "../types";

export const useNotificationsModalStore = createModalStore<NotificationsRecord>();
