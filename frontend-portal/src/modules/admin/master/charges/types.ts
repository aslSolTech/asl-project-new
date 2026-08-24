export interface RegistrationChargesRecord {
  id: string;
  planName: string;
  userType: string;
  amount: string;
}

export type CreateRegistrationChargesPayload = Omit<RegistrationChargesRecord, "id">;
export type UpdateRegistrationChargesPayload = RegistrationChargesRecord;
