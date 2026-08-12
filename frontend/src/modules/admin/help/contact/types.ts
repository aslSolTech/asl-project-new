export interface ContactRecord {
  id: string;
  phone: string;
  status: string;
}

export type CreateContactPayload = Omit<ContactRecord, "id">;
export type UpdateContactPayload = ContactRecord;
