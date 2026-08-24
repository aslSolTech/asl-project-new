import { z } from "zod";

export const subMenuSchema = z.object({
  parentMenu: z.string().min(1, "Parent Menu is required"),
  name: z.string().min(1, "Name is required"),
  status: z.string().min(1, "Status is required"),
});

export type SubMenuFormInput = z.infer<typeof subMenuSchema>;
