export interface FooterRecord {
  id: string;
  copyrightText: string;
  status: string;
}

export type CreateFooterPayload = Omit<FooterRecord, "id">;
export type UpdateFooterPayload = FooterRecord;
