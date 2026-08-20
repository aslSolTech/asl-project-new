export interface PackageRecord {
  id: string;
  packageName: string;
  trialPeriod: number | string;
  packageCharge: number | string;
  isDefault: string;
  status: string;
}

export type CreatePackagePayload = Omit<PackageRecord, "id">;
export type UpdatePackagePayload = PackageRecord;
