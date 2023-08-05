import PostFeed from "@/components/post/PostFeed";
import { db } from "@/db";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/lib/config";

import { desc } from "drizzle-orm";

export const getPostsDrizzle = async () => {
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
    limit: INFINITE_SCROLL_PAGINATION_RESULTS,
    offset: 0,
  });
  return posts;
};

const HomePageFeed = async () => {
  return null;
};

export default HomePageFeed;
