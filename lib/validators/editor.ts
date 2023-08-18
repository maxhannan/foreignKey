import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(128, {
      message: "Title must be less than 128 characters long",
    }),
  subtitle: z
    .string()
    .max(256, {
      message: "Subtitle must be less than 256 characters long",
    })
    .min(3, {
      message: "Subtitle must be at least 3 characters long",
    }),

  content: z.any(),
});
export const PostCreationRequestValidator = PostValidator.extend({
  featuredImageUrl: z.string().url(),
});
export type PostCreationRequest = z.infer<typeof PostCreationRequestValidator>;

export const LikeValidator = z.object({
  postId: z.string(),
  userId: z.string(),
  liking: z.boolean(),
});

export type LikeCreationRequest = z.infer<typeof LikeValidator>;
