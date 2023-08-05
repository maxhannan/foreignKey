import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { getPostsDrizzle } from "./components/HomepageFeed";
import PostFeed from "@/components/post/PostFeed";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log({ session });
  const posts = await getPostsDrizzle();

  return (
    // A grid of posts with a sidebar

    <main>
      <PostFeed initialPosts={posts} />
    </main>
  );
}
