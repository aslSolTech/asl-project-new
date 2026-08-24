export interface NoticeRecord {
  id: string;
  noticeText: string;
  status: string;
}

export type CreateNoticePayload = Omit<NoticeRecord, "id">;
export type UpdateNoticePayload = NoticeRecord;
