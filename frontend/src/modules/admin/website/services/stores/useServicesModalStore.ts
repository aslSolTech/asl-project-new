import { createModalStore } from "@/stores/useGenericModalStore";
import { ServicesRecord } from "../types";

export const useServicesModalStore = createModalStore<ServicesRecord>();
