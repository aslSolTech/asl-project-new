export interface PackageRecord {
  id: string;
  package: string;
  api: string;
  status: string;
}

export type CreatePackagePayload = Omit<PackageRecord, "id">;
export type UpdatePackagePayload = PackageRecord;
