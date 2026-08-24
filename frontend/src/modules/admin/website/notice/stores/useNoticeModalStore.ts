import { createModalStore } from "@/stores/useGenericModalStore";
import { NoticeRecord } from "../types";

export const useNoticeModalStore = createModalStore<NoticeRecord>();
