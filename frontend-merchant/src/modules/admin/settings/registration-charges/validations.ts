import { z } from "zod";

export const registrationChargesSchema = z.object({
  userType: z.string().min(1, "User Type is required"),
  displayStatus: z.string().min(1, "Display Status is required"),
  registerAmount: z.string().min(1, "Registration Amount is required"),
});

export type RegistrationChargesFormInput = z.infer<typeof registrationChargesSchema>;
