import { createModalStore } from "@/stores/useGenericModalStore";
import { MenuRecord } from "../types";

export const useMenuModalStore = createModalStore<MenuRecord>();
