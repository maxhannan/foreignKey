export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import EditorOutput from "@/components/EditorOutput";

import type { FC } from "react";
import PostHeading from "../../components/PostHeading";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getPostById } from "@/db/posts";
import { Button } from "@/components/ui/button";
import { icons } from "lucide-react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SideMenu from "../../components/SideMenu";
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
