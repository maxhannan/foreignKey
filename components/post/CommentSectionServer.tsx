import type { FC } from "react";

interface Props {
  post: any;
}

const CommentSectionServer: FC<Props> = async ({ post }) => {
  return <div>CommentSectionServer</div>;
};

export default CommentSectionServer;
