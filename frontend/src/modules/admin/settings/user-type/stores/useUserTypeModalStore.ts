import { createModalStore } from "@/stores/useGenericModalStore";
import { UserTypeRecord } from "../types";

export const useUserTypeModalStore = createModalStore<UserTypeRecord>();
