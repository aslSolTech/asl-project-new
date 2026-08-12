import { createModalStore } from "@/stores/useGenericModalStore";
import { ContactRecord } from "../types";

export const useContactModalStore = createModalStore<ContactRecord>();
