import { createModalStore } from "@/stores/useGenericModalStore";
import { CollectionRecord } from "../types";

export const useCollectionModalStore = createModalStore<CollectionRecord>();
