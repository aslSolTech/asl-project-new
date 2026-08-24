import { createModalStore } from "@/stores/useGenericModalStore";
import { UserRegisterRecord } from "../types";

export const useUserRegisterModalStore = createModalStore<UserRegisterRecord>();
