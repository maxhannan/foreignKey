import { PostType } from "@/db/posts";

import UserPopover from "./UserPopover";

import PostButtons from "./PostButtons";
import UserPopoverServer from "./UserPopoverServer";
import { db } from "@/db";
import { eq } from "drizzle-orm";
interface Props {
  post: PostType;
}

async function PostHeading({ post }: Props) {
  if (!post) return null;
  const likes = await db.query.likes.findMany({
    where: (likes) => eq(likes.postId, post.id),
  });
  console.log({ likes });
  return (
    <div className="flex   gap-4 flex-col not-prose justify-between ">
      <div className="flex gap-4 items-center">
        <div className="">
          <UserPopover post={post}>
            <UserPopoverServer post={post} />
          </UserPopover>
        </div>
        <div className="flex flex-col justify-center mr-8">
          <span className="text-gray-500 dark:text-gray-300 text-base font-bold md:text-lg ">
            {post!.title}
          </span>
          <span className="text-gray-500 dark:text-gray-300 text-xs flex-none">
            {post!.author.name}
          </span>
        </div>
      </div>

      <PostButtons post={post} likesArr={likes} />
    </div>
  );
}

export default PostHeading;
