import { z } from "zod";

export const bannerSchema = z.object({
  title: z.string().min(1, "Banner Title is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  status: z.string().min(1, "Status is required"),
});

export type BannerFormInput = z.infer<typeof bannerSchema>;
