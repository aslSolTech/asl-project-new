import { z } from "zod";

export const noticeSchema = z.object({
  noticeText: z.string().min(1, "Notice Text is required"),
  status: z.string().min(1, "Status is required"),
});

export type NoticeFormInput = z.infer<typeof noticeSchema>;
