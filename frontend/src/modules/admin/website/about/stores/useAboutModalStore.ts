import { createModalStore } from "@/stores/useGenericModalStore";
import { AboutRecord } from "../types";

export const useAboutModalStore = createModalStore<AboutRecord>();
