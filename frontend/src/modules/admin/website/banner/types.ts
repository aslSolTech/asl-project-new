export interface BannerRecord {
  id: string;
  title: string;
  imageUrl: string;
  status: string;
}

export type CreateBannerPayload = Omit<BannerRecord, "id">;
export type UpdateBannerPayload = BannerRecord;
