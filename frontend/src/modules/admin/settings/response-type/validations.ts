import { z } from "zod";

export const responseTypeSchema = z.object({
  responseFormat: z.string().min(1, "Response format is required!"),
  code: z.string().min(1, "Response code is required!"),
});

export type ResponseTypeFormInput = z.infer<typeof responseTypeSchema>;
