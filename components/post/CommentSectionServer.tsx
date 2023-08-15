import type { FC } from "react";

interface Props {
  post: any;
}

const CommentSectionServer: FC<Props> = async ({ post }) => {
  await new Promise((resolve) => setTimeout(resolve, 9000));
  return <div>CommentSectionServer</div>;
};

export default CommentSectionServer;
