import { z } from "zod";

export const operatorCategorySchema = z.object({
  categoryName: z.string().min(1, "Category Name is required"),
  code: z.string().min(1, "Category Code is required"),
});

export type OperatorCategoryFormInput = z.infer<typeof operatorCategorySchema>;
