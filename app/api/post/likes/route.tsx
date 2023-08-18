import { db } from "@/db";
import { likePost, unlikePost } from "@/db/posts";
import { likes } from "@/db/schema";
import { LikeValidator } from "@/lib/validators/editor";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  console.log("fetching likes");
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    console.log({ params });
    const postId = params.get("postId") as string;
    console.log({ postId });
    const dblikes = await db
      .select()
      .from(likes)
      .where(eq(likes.postId, postId));
    return NextResponse.json({ dblikes });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { postId, userId, liking } = LikeValidator.parse(body);
    if (liking) {
      await likePost({ postId, userId, id: createId() });
    } else {
      await unlikePost(postId, userId);
    }

    const dblikes = await db
      .select()
      .from(likes)
      .where(eq(likes.postId, postId));
    revalidatePath("/");

    return NextResponse.json({ dblikes });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
