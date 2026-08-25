import { z } from "zod";

export const apiTypeSchema = z.object({
  apiType: z.string().min(1, "API Type is required!"),
  requestParams: z.array(z.string()).default([]),
  responseParams: z.array(z.string()).default([]),
  walletType: z.string().min(1, "Wallet Type is required!"),
  isDisplayPdf: z.boolean().default(false),
});

export type ApiTypeFormInput = z.infer<typeof apiTypeSchema>;
