import { createModalStore } from "@/stores/useGenericModalStore";
import { CompanyRecord } from "../types";

export const useCompanyModalStore = createModalStore<CompanyRecord>();
