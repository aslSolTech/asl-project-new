import { createModalStore } from "@/stores/useGenericModalStore";
import { PackageRecord } from "../types";

export const usePackageModalStore = createModalStore<PackageRecord>();
