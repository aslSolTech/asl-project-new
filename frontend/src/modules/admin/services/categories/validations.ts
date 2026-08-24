import { z } from "zod";

export const categoriesSchema = z.object({
  categoryName: z.string().min(1, "Category Name is required"),
  status: z.string().min(1, "Status is required"),
});

export type CategoriesFormInput = z.infer<typeof categoriesSchema>;
