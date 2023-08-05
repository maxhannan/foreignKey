import { eq } from "drizzle-orm";
import { db } from ".";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/lib/config";

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
