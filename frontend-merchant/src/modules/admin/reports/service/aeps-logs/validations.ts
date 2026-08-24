import { z } from "zod";

export const aepsLogsSchema = z.object({
  details: z.string().min(1, "Details is required"),
  status: z.string().min(1, "Status is required"),
});

export type AepsLogsFormInput = z.infer<typeof aepsLogsSchema>;
