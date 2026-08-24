import { createModalStore } from "@/stores/useGenericModalStore";
import { FooterLinksRecord } from "../types";

export const useFooterLinksModalStore = createModalStore<FooterLinksRecord>();
