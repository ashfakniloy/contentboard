import { z } from "zod";

export const mediaSchema = z.object({
  imageUrl: z.string().min(1, "Image URL is required"),
  imageId: z.string().min(1, "Image public_id is required"),
  imageTitle: z.string().min(1, "Image title is required"),
  altText: z.string().min(1, "Alt text is required"),
});

export type MediaProps = z.infer<typeof mediaSchema>;
