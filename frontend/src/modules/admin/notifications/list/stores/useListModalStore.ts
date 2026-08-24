import { createModalStore } from "@/stores/useGenericModalStore";
import { ListRecord } from "../types";

export const useListModalStore = createModalStore<ListRecord>();
