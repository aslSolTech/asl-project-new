export interface DeviceRequestsRecord {
  id: string;
  name: string;
  status: string;
}

export type CreateDeviceRequestsPayload = Omit<DeviceRequestsRecord, "id">;
export type UpdateDeviceRequestsPayload = DeviceRequestsRecord;
