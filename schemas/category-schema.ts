import { z } from "zod";

export const categorySchema = z.object({
  categoryName: z
    .string()
    .min(1, "Category name is required")
    .max(30, "Caregory name must be atmost 30 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(40, "Slug must be atmost 40 characters"),
  description: z.string().min(1, "Description is required"),
});

export type CategoryProps = z.infer<typeof categorySchema>;
