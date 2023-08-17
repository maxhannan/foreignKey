"use server";

import { likePost, unlikePost } from "@/db/posts";
import { NewLike } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const likePostAction = async (newLike: NewLike) => {
  await likePost(newLike);

  revalidatePath(`/post/[postid]`);
};

export const unlikePostAction = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  try {
    const res = await unlikePost(postId, userId);
    console.log({ res });
    return revalidatePath(`/post/[postid]`);
  } catch (error) {
    console.error(error);
    return redirect(`/post/[postid]`);
  }
};
