import { z } from "zod";

export const adminRegisterSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  email: z.string().min(1, "Email Address is required"),
  phone: z.string().min(1, "Phone Number is required"),
  role: z.string().min(1, "Admin Role is required"),
});

export type AdminRegisterFormInput = z.infer<typeof adminRegisterSchema>;
