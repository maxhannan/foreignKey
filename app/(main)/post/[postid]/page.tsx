export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import EditorOutput from "@/components/EditorOutput";
import PostControls from "@/components/post/PostControls";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { FC } from "react";
import BackButton from "../../components/BackButton";

interface Props {
  params: {
    postid: string;
  };
}

const PostPage: FC<Props> = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: params.postid,
    },
    include: {
      author: {
        select: {
          name: true,
          id: true,
          image: true,
        },
      },
    },
  });
  if (!post) return notFound();
  return (
    <div className="container mx-auto  max-w-[1200px] lg:max-w-[70vw] 2xl:max-w-[55vw] 3xl:max-w-[40vw] px-1.5 prose prose-stone dark:prose-invert mt-2 animate-in slide-in-from-bottom-96  duration-300 ">
      <div className="not-prose mb-3 flex justify-between">
        <div>
          <h1 className="text-4xl font-bold not-prose ">{post.title}</h1>
          <h4 className="text-muted-foreground font-light not-prose text-xl">
            {post.subtitle}
          </h4>
        </div>
        {/* close button */}
        <BackButton />
      </div>
      <div className="not-prose mb-3">
        <PostControls author={post.author} />
      </div>

      <EditorOutput content={post.content} />
    </div>
  );
};

export default PostPage;
