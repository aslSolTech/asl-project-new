export interface PackageUpgradeRecord {
  id: string;
  packageName: string;
  status: string;
}

export type CreatePackageUpgradePayload = Omit<PackageUpgradeRecord, "id">;
export type UpdatePackageUpgradePayload = PackageUpgradeRecord;
