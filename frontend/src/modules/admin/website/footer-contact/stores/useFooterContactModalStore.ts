import { createModalStore } from "@/stores/useGenericModalStore";
import { FooterContactRecord } from "../types";

export const useFooterContactModalStore = createModalStore<FooterContactRecord>();
