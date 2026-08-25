import { createModalStore } from "@/stores/useGenericModalStore";
import { RegistrationChargesRecord } from "../types";

export const useRegistrationChargesModalStore = createModalStore<RegistrationChargesRecord>();
