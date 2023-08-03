import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import PostCard from "@/components/PostCard";
import HomePageFeed, { getPosts } from "./components/HomepageFeed";
import PostFeed from "@/components/post/PostFeed";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import LoadingSkeleton from "../loadingSkeleton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log({ session });
  const posts = await getPosts();

  return (
    // A grid of posts with a sidebar

    <main className="animate-in fade-in-0 duration-700">
      {/* @ts-ignore */}

      <PostFeed initialPosts={posts} />
    </main>
  );
}
