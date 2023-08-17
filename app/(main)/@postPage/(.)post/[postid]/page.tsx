import type { FC } from "react";

import { getPostById } from "@/db/posts";

import PostPage from "@/components/post/PostPage";

interface Props {
  params: {
    postid: string;
  };
}

const PostPageModal: FC<Props> = async ({ params }) => {
  const post = await getPostById(params.postid);
  if (!post) return null;

  return <PostPage post={post} />;
};
export default PostPageModal;
