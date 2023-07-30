export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import EditorOutput from "@/components/EditorOutput";
import PostControls from "@/components/post/PostControls";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { FC } from "react";

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
    <div className="container mx-auto max-w-[800px] px-1.5 prose prose-stone dark:prose-invert mt-4">
      <div className="not-prose mb-2">
        <h1 className="text-4xl font-bold not-prose ">{post.title}</h1>
        <h4 className="text-muted-foreground font-light not-prose text-xl">
          {post.subtitle}
        </h4>
      </div>
      <div className="not-prose mb-2">
        <PostControls author={post.author} />
      </div>
      <EditorOutput content={post.content} />
    </div>
  );
};

export default PostPage;
