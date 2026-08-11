import { z } from "zod";

export const employeeRegisterSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  email: z.string().min(1, "Email Address is required"),
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
});

export type EmployeeRegisterFormInput = z.infer<typeof employeeRegisterSchema>;
