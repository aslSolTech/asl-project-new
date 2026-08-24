export interface ServicesRecord {
  id: string;
  serviceName: string;
  status: string;
}

export type CreateServicesPayload = Omit<ServicesRecord, "id">;
export type UpdateServicesPayload = ServicesRecord;
