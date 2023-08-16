import { eq } from "drizzle-orm";
import { db } from ".";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/lib/config";
import { NewLike, likes } from "./schema";
import { createId } from "@paralleldrive/cuid2";

export const getPostById = async (id: string) => {
  const post = await db.query.posts.findFirst({
    where: (posts) => eq(posts.id, id),
    with: {
      author: {
        columns: {
          name: true,
          id: true,
          image: true,
        },
      },
    },
  });
  return post;
};
export type PostType = Awaited<ReturnType<typeof getPostById>>;

export const getAllPostsPaginated = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) => {
  const posts = await db.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.created_at)],
    with: {
      author: {
        columns: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    limit,
    offset,
  });
  return posts;
};

export const likePost = async (newLike: NewLike) => {
  const { id, postId, userId } = newLike;
  try {
    const like = await db.insert(likes).values({
      id,
      postId,
      userId,
    });
    return like;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const unlikePost = async (postId: string, userId: string) => {
  try {
    const like =
      (await db.delete(likes).where(eq(likes.postId, postId))) &&
      eq(likes.userId, userId);
    return like;
  } catch (error) {
    console.error(error);
    return error;
  }
};
