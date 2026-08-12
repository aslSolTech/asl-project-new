export interface PackageRecord {
  id: string;
  txId: string;
  amount: string;
  status: string;
}

export type CreatePackagePayload = Omit<PackageRecord, "id">;
export type UpdatePackagePayload = PackageRecord;
