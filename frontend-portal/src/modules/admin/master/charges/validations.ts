import { z } from "zod";

export const registrationChargesSchema = z.object({
  planName: z.string().min(1, "Plan Name is required"),
  userType: z.string().min(1, "Target User Type is required"),
  amount: z.string().min(1, "Charge Amount (INR) is required"),
});

export type RegistrationChargesFormInput = z.infer<typeof registrationChargesSchema>;
