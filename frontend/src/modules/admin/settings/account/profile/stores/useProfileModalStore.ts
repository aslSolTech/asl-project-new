import { createModalStore } from "@/stores/useGenericModalStore";
import { ProfileRecord } from "../types";

export const useProfileModalStore = createModalStore<ProfileRecord>();
