import type { FC } from "react";
import PostModal from "../../components/PostModal";
import { prisma } from "@/lib/prisma";
import PostControls from "@/components/post/PostControls";
import EditorOutput from "@/components/EditorOutput";

interface Props {
  params: {
    postid: string;
  };
}
const page: FC<Props> = async ({ params }) => {
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
  if (!post) return null;

  return (
    <PostModal>
      <div className="container mx-auto  max-w-[1200px] lg:max-w-[70vw] 2xl:max-w-[55vw] 3xl:max-w-[40vw] px-0 prose prose-stone dark:prose-invert mt-4   duration-300 break-words mb-8">
        <div className=" mb-3 flex justify-between px-4 lg:px-0">
          <div>
            <h1 className=" mb-1">{post.title}</h1>
            <h5 className="text-muted-foreground font-light  text-lg">
              {post.subtitle}
            </h5>
          </div>
        </div>
        <div className="not-prose px-4 lg:px-0">
          <PostControls author={post.author} />
        </div>

        <EditorOutput content={post.content} />
      </div>
    </PostModal>
  );
};

export default page;
