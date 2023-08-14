import PostHeading from "./PostHeading";

import { type FC } from "react";
import EditorOutput from "../EditorOutput";
import { PostType } from "@/db/posts";

interface Props {
  post: PostType;
}

const PostPage: FC<Props> = ({ post }) => {
  if (!post) return null;

  return (
    <div className="container mx-auto  max-w-[100vw] lg:max-w-[70vw]   3xl:max-w-[45vw]  prose prose-stone dark:prose-invert mt-2  animate-in fade-in-0  duration-300 break-words mb-4 pb-16 px-4 lg:px-24">
      {/* fixed position vertical buttons */}

      <PostHeading post={post} />
      <EditorOutput content={post.content} />
    </div>
  );
};

export default PostPage;
