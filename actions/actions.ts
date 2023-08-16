"use server";

import { likePost, unlikePost } from "@/db/posts";
import { NewLike } from "@/db/schema";

export const likePostAction = async (newLike: NewLike) => {
  const res = await likePost(newLike);
  console.log({ res });
  return null;
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
  } catch (error) {
    console.error(error);
  }

  return null;
};
