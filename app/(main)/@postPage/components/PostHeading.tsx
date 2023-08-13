import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { PostType } from "@/db/posts";

import UserPopover from "./UserPopover";

import PostButtons from "./PostButtons";
import UserPopoverServer from "./UserPopoverServer";
interface Props {
  post: PostType;
}

function PostHeading({ post }: Props) {
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

      <PostButtons post={post} />
    </div>
  );
}

export default PostHeading;
