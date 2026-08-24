import { z } from "zod";

export const distributorRequestsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.string().min(1, "Status is required"),
});

export type DistributorRequestsFormInput = z.infer<typeof distributorRequestsSchema>;
