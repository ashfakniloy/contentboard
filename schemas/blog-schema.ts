import { z } from "zod";
import { mediaSchema } from "./media-schema";
import { removeHtmlTags } from "@/utils/remove-hmtl-tags";
// import { removeHtmlTags } from "@/utils/remove-html-tags";

export const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(300, "Title must be at most 300 characters")
    .refine((value) => value.trim().length > 0, "Title can't be empty")
    .refine(
      (value) => value.trim().length >= 5,
      "Title must be at least 5 characters"
    ),
  slug: z.string().min(1, "Blog slug is required"),
  // body: z.string().min(1, "Body is required"),
  body: z
    .string()
    .min(1, "Body is required")
    .refine(
      (value) => removeHtmlTags(value).length >= 200,
      "Body is too short"
    ),
  author: z.string().min(1, "Author is required"),
  metaDescription: z.string().min(1, "Meta description is required"),
  categories: z.array(z.string()).min(1, "Atleast 1 category is required"),
  // featuredImage: z.string().min(1, "Featured image is required"),
  featuredImage: mediaSchema,
  bodyImages: z.array(mediaSchema).optional(),
  published: z.boolean(),
  // categories: z.array(
  //   z.object({
  //     id: z.string(),
  //     categoryName: z.string().min(1, "Atleast 1 category is required")
  //   })
  // )
  // categories: z.array(categorySchema)
});

export type BlogProps = z.infer<typeof blogSchema>;
