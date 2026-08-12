import { z } from "zod";

export const apiKeysSchema = z.object({
  keyName: z.string().min(1, "Key Name is required"),
  status: z.string().min(1, "Status is required"),
});

export type ApiKeysFormInput = z.infer<typeof apiKeysSchema>;
