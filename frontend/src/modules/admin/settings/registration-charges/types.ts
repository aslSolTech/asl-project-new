export interface RegistrationChargesRecord {
  id: string;
  userType: string;
  displayStatus: string;
  registerAmount: string;
}

export type CreateRegistrationChargesPayload = Omit<RegistrationChargesRecord, "id">;
export type UpdateRegistrationChargesPayload = RegistrationChargesRecord;
