import PostFeed from "@/components/post/PostFeed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      createdAt: true,
      featuredImgBlurHash: true,
      featuredImgSrc: true,
    },

    take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
  });
  return posts;
};

export type ExtendedPost = Prisma.PromiseReturnType<typeof getPosts>;

const HomePageFeed = async () => {
  const posts = await getPosts();
  // @ts-ignore
  return <PostFeed initialPosts={posts} />;
};

export default HomePageFeed;
