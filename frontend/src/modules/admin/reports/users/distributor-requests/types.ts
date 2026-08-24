export interface DistributorRequestsRecord {
  id: string;
  name: string;
  status: string;
}

export type CreateDistributorRequestsPayload = Omit<DistributorRequestsRecord, "id">;
export type UpdateDistributorRequestsPayload = DistributorRequestsRecord;
