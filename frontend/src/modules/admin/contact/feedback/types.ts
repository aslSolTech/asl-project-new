export interface FeedbackRecord {
  id: string;
  name: string;
  feedback: string;
  status: string;
}

export type CreateFeedbackPayload = Omit<FeedbackRecord, "id">;
export type UpdateFeedbackPayload = FeedbackRecord;
