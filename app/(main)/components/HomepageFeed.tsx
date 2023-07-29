import PostFeed from "@/components/post/PostFeed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import { Post, Prisma, User } from "@prisma/client";

export const getPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },

    take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
  });
  return posts;
};

export type ExtendedPost = Post & {
  author: {
    name: string;
    image: string;
  };
};

const HomePageFeed = async () => {
  const posts = await getPosts();
  // @ts-ignore
  return <PostFeed initialPosts={posts} />;
};

export default HomePageFeed;
