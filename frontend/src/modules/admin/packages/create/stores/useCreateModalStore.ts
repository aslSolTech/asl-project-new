import { createModalStore } from "@/stores/useGenericModalStore";
import { CreateRecord } from "../types";

export const useCreateModalStore = createModalStore<CreateRecord>();
