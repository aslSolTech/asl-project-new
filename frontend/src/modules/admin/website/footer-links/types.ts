export interface FooterLinksRecord {
  id: string;
  name: string;
  url: string;
  status: string;
}

export type CreateFooterLinksPayload = Omit<FooterLinksRecord, "id">;
export type UpdateFooterLinksPayload = FooterLinksRecord;
