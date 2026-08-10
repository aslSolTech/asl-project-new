import { z } from "zod";

export const companySchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name is too long"),
  companyLogo: z
    .custom<File | string | null | undefined>(
      (val) =>
        val === undefined ||
        val === null ||
        typeof val === "string" ||
        typeof window === "undefined" ||
        val instanceof File,
      "Invalid file format"
    )
    .optional(),
  companyEmail: z.email("Please enter a valid company email"),
  companyPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  website: z
    .url("Please enter a valid URL (e.g. https://example.com)")
    .optional()
    .or(z.literal("")),
  address: z.string().min(5, "Address must be at least 5 characters"),
  gstNumber: z
    .string()
    .min(15, "GST Number must be 15 characters")
    .max(15, "GST Number must be 15 characters")
    .optional()
    .or(z.literal("")),
});

export type CompanyFormInput = z.infer<typeof companySchema>;
