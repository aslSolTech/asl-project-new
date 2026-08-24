import { createModalStore } from "@/stores/useGenericModalStore";
import { AddRecord } from "../types";

export const useAddModalStore = createModalStore<AddRecord>();
