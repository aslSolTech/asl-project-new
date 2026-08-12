export interface FooterContactRecord {
  id: string;
  phone: string;
  email: string;
  status: string;
}

export type CreateFooterContactPayload = Omit<FooterContactRecord, "id">;
export type UpdateFooterContactPayload = FooterContactRecord;
