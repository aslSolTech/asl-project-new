import { createModalStore } from "@/stores/useGenericModalStore";
import { FooterRecord } from "../types";

export const useFooterModalStore = createModalStore<FooterRecord>();
