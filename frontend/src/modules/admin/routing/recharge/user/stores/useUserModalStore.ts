import { createModalStore } from "@/stores/useGenericModalStore";
import { UserRecord } from "../types";

export const useUserModalStore = createModalStore<UserRecord>();
