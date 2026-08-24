export interface ContactRecord {
  id: string;
  address: string;
  status: string;
}

export type CreateContactPayload = Omit<ContactRecord, "id">;
export type UpdateContactPayload = ContactRecord;
