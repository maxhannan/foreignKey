import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { getPostsDrizzle } from "./components/HomepageFeed";
import PostFeed from "@/components/post/PostFeed";
import { getAllPostsPaginated } from "@/db/posts";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/lib/config";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const posts = await getAllPostsPaginated({
    limit: INFINITE_SCROLL_PAGINATION_RESULTS,
    offset: 0,
  });

  return (
    // A grid of posts with a sidebar

    <main>
      <PostFeed initialPosts={posts} />
    </main>
  );
}
