import { z } from "zod";

export const merchantApiSchema = z.object({
  partnerId: z.string().min(1, "API Partner is required!"),
  partnerName: z.string().min(1, "Partner Name is required!"),
  partnerCompanyName: z.string().min(1, "Partner Company is required!"),
  retailerCode: z.string().min(1, "Retailer Code is required!"),
  retailerName: z.string().min(1, "Retailer Name is required!"),
  shopName: z.string().min(1, "Shop Name is required!"),
  contactNo: z.string().min(10, "Valid 10-digit contact number is required!"),
  email: z.email("Valid email is required!"),
  panNo: z.string().min(10, "PAN number is required!"),
  aadhaarNo: z.string().min(12, "12-digit Aadhaar number is required!"),
  kycStatus: z.enum(["verified", "pending", "rejected"]).default("pending"),
  isOtpVerify: z.enum(["Y", "N"]).default("Y"),
  isBlocked: z.boolean().default(false),
  status: z.enum(["active", "inactive", "blocked"]).default("active"),
  callbackUrl: z.string().optional(),
  apiKey: z.string().optional(),
});

export type MerchantApiFormInput = z.infer<typeof merchantApiSchema>;
