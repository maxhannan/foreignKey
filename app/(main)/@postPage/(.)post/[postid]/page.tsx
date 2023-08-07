export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import EditorOutput from "@/components/EditorOutput";

import type { FC } from "react";
import PostHeading from "../../components/PostHeading";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getPostById } from "@/db/posts";

interface Props {
  params: {
    postid: string;
  };
}

const PostPageModal: FC<Props> = async ({ params }) => {
  const post = await getPostById(params.postid);
  if (!post) return null;

  return (
    <div className="container mx-auto  max-w-[100vw] lg:max-w-[75vw]  xl:max-w-[65vw] 2xl:max-w-[55vw]  3xl:max-w-[45vw]  prose prose-stone dark:prose-invert mt-2  animate-in fade-in-0  duration-300 break-words mb-4 pb-16 px-4 lg:px-24">
      <PostHeading post={post} />
      <EditorOutput content={post.content} />
    </div>
  );
};
export default PostPageModal;
