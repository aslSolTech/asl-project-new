import { createModalStore } from "@/stores/useGenericModalStore";
import { BannerRecord } from "../types";

export const useBannerModalStore = createModalStore<BannerRecord>();
