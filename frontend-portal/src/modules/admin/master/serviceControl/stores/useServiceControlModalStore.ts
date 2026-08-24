import { createModalStore } from "@/stores/useGenericModalStore";
import { ServiceControlRecord } from "../types";

export const useServiceControlModalStore = createModalStore<ServiceControlRecord>();
