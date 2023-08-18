"use client";
import { PostType } from "@/db/posts";

import UserPopover from "./UserPopover";

import PostButtons from "./PostButtons";
import UserPopoverServer from "./UserPopoverServer";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { Suspense } from "react";
import UserPopoverSkeleton from "./UserPopoverSkeleton";
import CommentSheet from "./CommentSheet";
import CommentSectionServer from "./CommentSectionServer";
import CommentContextProvider from "./CommentContextProvider";
interface Props {
  post: PostType;
}
export const revalidate = 0;
const getData = async (postid: string) => {
  const likes = await db.query.likes.findMany({
    where: (likes) => eq(likes.postId, postid),
  });
  return likes;
};
function PostHeading({ post }: Props) {
  if (!post) return null;
  const likes = post.likes;
  console.log("likes", likes);

  return (
    <div className="flex   gap-4 flex-col not-prose justify-between ">
      <div className="flex gap-4 items-center">
        <div className="">
          <UserPopover post={post}>
            <Suspense fallback={<UserPopoverSkeleton />}>
              <UserPopoverServer post={post} />
            </Suspense>
          </UserPopover>
        </div>
        <div className="flex flex-col justify-center mr-8">
          <span className="text-gray-500 dark:text-gray-300 text-base font-bold md:text-lg ">
            {post!.title}
          </span>
          <span className="text-gray-500 dark:text-gray-300 text-xs flex-none">
            {post!.subtitle}
          </span>
        </div>
      </div>
      <CommentContextProvider>
        <PostButtons post={post} likesArr={likes} />
        <CommentSheet>
          <Suspense fallback={<UserPopoverSkeleton />}>
            <CommentSectionServer post={post} />
          </Suspense>
        </CommentSheet>
      </CommentContextProvider>
    </div>
  );
}

export default PostHeading;
