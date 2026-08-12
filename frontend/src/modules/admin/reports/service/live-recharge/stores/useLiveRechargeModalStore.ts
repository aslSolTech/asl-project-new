import { createModalStore } from "@/stores/useGenericModalStore";
import { LiveRechargeRecord } from "../types";

export const useLiveRechargeModalStore = createModalStore<LiveRechargeRecord>();
