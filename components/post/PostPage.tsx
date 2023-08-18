import PostHeading from "./PostHeading";

import { Suspense, type FC } from "react";
import EditorOutput from "../EditorOutput";
import { PostType } from "@/db/posts";
import LikeButton from "./LikeButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

interface Props {
  post: PostType;
}

const PostPage: FC<Props> = async ({ post }) => {
  if (!post) return null;
  const session = await getServerSession(authOptions);
  const initialLikes = post!.likes;

  console.log({ initialLikes });
  return (
    <div className="container mx-auto  max-w-[100vw] lg:max-w-[1200px] prose prose-stone dark:prose-invert mt-2  animate-in fade-in-0  duration-300 break-words mb-4 pb-16 px-4 lg:px-24">
      {/* fixed position vertical buttons */}
      <LikeButton post={post} />
      <EditorOutput content={post.content} />
    </div>
  );
};

export default PostPage;
