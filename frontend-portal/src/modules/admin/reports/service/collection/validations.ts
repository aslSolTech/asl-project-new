import { z } from "zod";

export const collectionSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  status: z.string().min(1, "Status is required"),
});

export type CollectionFormInput = z.infer<typeof collectionSchema>;
