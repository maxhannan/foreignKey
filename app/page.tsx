import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Editor from "@/components/Editor";
import axios from "axios";
export const dynamic = "force-dynamic";
import Image from "next/image";
import PostCard from "@/components/PostCard";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log({ session });

  return (
    // A grid of posts with a sidebar
    <main className="px-2">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5  gap-4">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />

        <PostCard />
        <PostCard />
        <PostCard />

        <PostCard />
        <PostCard />

        <PostCard />
      </div>
    </main>
  );
}
