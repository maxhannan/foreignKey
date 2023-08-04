export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import EditorOutput from "@/components/EditorOutput";
import PostControls from "@/components/post/PostControls";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { get } from "http";
import type { FC } from "react";
import PostHeading from "../../components/PostHeading";

interface Props {
  params: {
    postid: string;
  };
}

export const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
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
  return post;
};
export type PostType = Prisma.PromiseReturnType<typeof getPost>;
const PostPageModal: FC<Props> = async ({ params }) => {
  const post = await getPost(params.postid);
  if (!post) return null;

  return (
    <div className="container mx-auto  max-w-[1200px]   2xl:max-w-[75vw] 4xl:max-w-[45vw]    prose prose-stone dark:prose-invert mt-2  animate-in fade-in-0  duration-300 break-words mb-4 pb-16 px-4 lg:px-20">
      <PostHeading post={post} />
      <EditorOutput content={post.content} />
    </div>
  );
};
export default PostPageModal;
