import { z } from "zod";

export const employeeRegisterSchema = z.object({
  firstName: z.string().min(1, "First Name is required!"),
  lastName: z.string().min(1, "Last Name is required!"),
  mobile: z.string().min(1, "Mobile Number is required!").regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number!"),
  email: z.email("Invalid email address").min(1, "Email Address is required!"),
  address: z.string().min(1, "Address is required!"),
  isOtpVerify: z.string().min(1, "Is OTP Verify selection is required!"),
  status: z.string().min(1, "Status is required!"),
});

export type EmployeeRegisterFormInput = z.infer<typeof employeeRegisterSchema>;
