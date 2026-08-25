import { z } from "zod";

export const employeeLedgerSchema = z.object({
  type: z.string().min(1, "Type is required"),
  balance: z.string().min(1, "Balance is required"),
});

export type EmployeeLedgerFormInput = z.infer<typeof employeeLedgerSchema>;
