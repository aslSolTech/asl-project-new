import { z } from "zod";

export const createSchema = z.object({
  name: z.string().min(1, "Package Name is required"),
  price: z.string().min(1, "Price is required"),
  status: z.string().min(1, "Status is required"),
});

export type CreateFormInput = z.infer<typeof createSchema>;
