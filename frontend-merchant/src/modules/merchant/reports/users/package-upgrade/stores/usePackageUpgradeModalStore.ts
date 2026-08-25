import { createModalStore } from "@/stores/useGenericModalStore";
import { PackageUpgradeRecord } from "../types";

export const usePackageUpgradeModalStore = createModalStore<PackageUpgradeRecord>();
