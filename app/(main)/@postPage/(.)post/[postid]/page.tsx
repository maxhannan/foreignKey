import type { FC } from "react";

import { getPostById } from "@/db/posts";

import PostPage from "@/components/post/PostPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

interface Props {
  params: {
    postid: string;
  };
}
export const revalidate = 0;
const PostPageModal: FC<Props> = async ({ params }) => {
  const post = await getPostById(params.postid);

  if (!post) return null;

  return <PostPage post={post} />;
};
export default PostPageModal;
