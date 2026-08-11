import { z } from "zod";

export const userRegisterSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required"),
  mobile: z.string().min(1, "Mobile Number is required"),
  companyName: z.string().min(1, "Company Name is required"),
});

export type UserRegisterFormInput = z.infer<typeof userRegisterSchema>;
