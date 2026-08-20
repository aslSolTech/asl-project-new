import { z } from "zod";

export const settingsSchema = z.object({
  serviceIcon: z.any().optional(),
  serviceType: z.string().min(1, "Service Type is required"),
  serviceName: z.string().min(1, "Service Name is required"),
  shortDesc: z.string().optional(),
  linkPage: z.string().min(1, "Link Page is required"),
  serviceOrder: z.union([z.string(), z.number()]).refine((val) => String(val).trim().length > 0, {
    message: "Service Order is required",
  }),
  status: z.string().min(1, "Status is required"),
});

export type SettingsFormInput = z.infer<typeof settingsSchema>;
