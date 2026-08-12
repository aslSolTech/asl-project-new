import { z } from "zod";

export const callbacksSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone Number is required"),
  status: z.string().min(1, "Status is required"),
});

export type CallbacksFormInput = z.infer<typeof callbacksSchema>;
