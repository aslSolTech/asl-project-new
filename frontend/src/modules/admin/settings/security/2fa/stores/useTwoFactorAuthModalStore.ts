import { createModalStore } from "@/stores/useGenericModalStore";
import { TwoFactorAuthRecord } from "../types";

export const useTwoFactorAuthModalStore = createModalStore<TwoFactorAuthRecord>();
