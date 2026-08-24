import { createModalStore } from "@/stores/useGenericModalStore";
import { SubMenuRecord } from "../types";

export const useSubMenuModalStore = createModalStore<SubMenuRecord>();
