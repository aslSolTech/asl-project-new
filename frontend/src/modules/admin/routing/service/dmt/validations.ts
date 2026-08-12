import { z } from "zod";

export const dmtSchema = z.object({
  bank: z.string().min(1, "Bank is required"),
  api: z.string().min(1, "API Partner is required"),
  status: z.string().min(1, "Status is required"),
});

export type DmtFormInput = z.infer<typeof dmtSchema>;
