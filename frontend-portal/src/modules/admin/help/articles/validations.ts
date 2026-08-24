import { z } from "zod";

export const articlesSchema = z.object({
  title: z.string().min(1, "Article Title is required"),
  status: z.string().min(1, "Status is required"),
});

export type ArticlesFormInput = z.infer<typeof articlesSchema>;
