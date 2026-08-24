import { createModalStore } from "@/stores/useGenericModalStore";
import { FeedbackRecord } from "../types";

export const useFeedbackModalStore = createModalStore<FeedbackRecord>();
