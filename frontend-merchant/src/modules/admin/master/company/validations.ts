import { z } from "zod";

export const companySchema = z.object({
  companyLogo: z
    .custom<File | string | null | undefined>(
      (val) =>
        val === undefined ||
        val === null ||
        typeof val === "string" ||
        typeof window === "undefined" ||
        val instanceof File,
      "Invalid file format!"
    )
    .optional(),
  companyName: z.string().min(2, "Company Name is required!"),
  printName: z.string().min(2, "Print Name is required!"),
  billnoPrefix: z.string().min(1, "Bill No Prefix is required!"),
  beginingFrom: z.string().min(1, "Beginning From Date is required!"),
  commencingFrom: z.string().optional().or(z.literal("")),
  address1: z.string().min(3, "Address (1) is required!"),
  address2: z.string().optional().or(z.literal("")),
  address3: z.string().optional().or(z.literal("")),
  country: z.string().min(1, "Country is required!"),
  state: z.string().min(1, "State is required!"),
  contactNumber1: z.string().min(7, "Contact Number (1) is required!"),
  contactNumber2: z.string().optional().or(z.literal("")),
  callbackNumber: z.string().optional().or(z.literal("")),
  landNumber: z.string().optional().or(z.literal("")),
  emailForService: z.email("Invalid Email ID for Service").optional().or(z.literal("")),
  emailForInvoice: z.email("Invalid Email ID for Invoice").optional().or(z.literal("")),
  website: z.url("Invalid Website URL (e.g. https://example.com)").optional().or(z.literal("")),
  faxNo: z.string().optional().or(z.literal("")),
  tinNo: z.string().optional().or(z.literal("")),
  cstNo: z.string().optional().or(z.literal("")),
  taxNo: z.string().optional().or(z.literal("")),
  panNo: z.string().regex(/^[A-Z]{5}\d{4}[A-Z]$/, "Invalid PAN format (e.g. ABCDE1234F)").optional().or(z.literal("")),
  cinNo: z.string().regex(/^[LUu]\d{5}[A-Za-z]{2}\d{4}[A-Za-z]{3}\d{6}$/, "Invalid CIN format").optional().or(z.literal("")),
  gstNo: z.string().min(15, "GST No must be 15 characters!").max(15, "GST No must be 15 characters!").regex(/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[\dA-Z]$/, "Invalid GSTIN format (e.g. 22AAAAA0000A1Z5)"),
  gstPer: z.number({ message: "GST % is required!" }).min(0, "GST % cannot be negative!").max(100, "GST % cannot exceed 100%!"),
  declaration: z.string().optional().or(z.literal("")),
});

export type CompanyFormInput = z.infer<typeof companySchema>;
