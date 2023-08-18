"use server";

import { likePost, unlikePost } from "@/db/posts";
import { NewLike } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function likePostAction(newLike: NewLike) {
  await likePost(newLike);
}

export async function unlikePostAction({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) {
  console.log({ postId, userId }, "HELLO");
  try {
    const res = await unlikePost(postId, userId);
    console.log({ res });
  } catch (error) {
    console.error({ error });
  }
}
