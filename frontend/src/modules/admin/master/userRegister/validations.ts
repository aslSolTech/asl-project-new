import { z } from "zod";

const mobileRegex = /^[6-9]\d{9}$/;
const pinCodeRegex = /^\d{6}$/;
const panRegex = /^[A-Z]{5}\d{4}[A-Z]$/;
const aadhaarRegex = /^\d{12}$/;
const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[\dA-Z]$/;

function isValidIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    if (!/^\d{1,3}$/.test(part)) return false;
    const num = Number(part);
    return num >= 0 && num <= 255 && String(num) === part;
  });
}

export const userRegisterSchema = z.object({
  // Basic Details
  firstName: z.string().min(1, "First Name is required!"),
  lastName: z.string().optional().or(z.literal("")),
  userTypeId: z.string().min(1, "User Type is required!"),
  companyName: z.string().min(1, "Company Name is required!"),
  contactNo: z
    .string()
    .min(1, "Contact Number is required!")
    .regex(mobileRegex, "Contact Number must be a valid 10-digit mobile number!"),
  whatsappNo: z
    .string()
    .optional()
    .refine((val) => !val || mobileRegex.test(val), {
      message: "WhatsApp Number must be a valid 10-digit mobile number!",
    }),
  email: z.email("Please enter a valid email address!"),
  dob: z.string().optional().or(z.literal("")),
  gender: z.string().min(1, "Sex/Gender is required!"),
  isOtpVerify: z.string().min(1, "OTP Verification status is required!"),

  // Address Details
  address: z.string().min(1, "Address is required!"),
  landmark: z.string().optional().or(z.literal("")),
  nationality: z.string().optional().or(z.literal("")),
  pinCode: z
    .string()
    .min(1, "PIN Code is required!")
    .regex(pinCodeRegex, "PIN Code must be a 6-digit number!"),

  // Other's Details
  panNo: z
    .string()
    .min(1, "PAN Number is required!")
    .transform((v) => v.toUpperCase())
    .refine((val) => panRegex.test(val), {
      message: "PAN Number format must be valid (e.g. ABCDE1234F)!",
    }),
  gstNo: z
    .string()
    .optional()
    .refine((val) => !val || gstRegex.test(val.toUpperCase()), {
      message: "Please enter a valid 15-digit GSTIN number!",
    }),
  aadhaarNo: z
    .string()
    .min(1, "Aadhaar Number is required!")
    .regex(aadhaarRegex, "Aadhaar Number must be a 12-digit number!"),
  userIpAddress: z
    .string()
    .optional()
    .refine((val) => !val || isValidIPv4(val), {
      message: "Please enter a valid IPv4 address (e.g. 192.168.1.1)!",
    }),
  callbackUrl: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Please enter a valid URL (e.g. https://example.com/callback)!",
      }
    ),

  // Package Details
  packageId: z.string().min(1, "Package selection is required!"),
  lockAmount: z.string().optional().or(z.literal("")),
  loginStatus: z.string().min(1, "Login Status is required!"),
});

export type UserRegisterFormInput = z.infer<typeof userRegisterSchema>;
