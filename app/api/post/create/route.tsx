import { prisma } from "@/lib/prisma";

import {
  PostCreationRequestValidator,
  PostValidator,
} from "@/lib/validators/editor";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../../auth/[...nextauth]/options";

import { getPlaiceholder } from "plaiceholder";
import { revalidatePath } from "next/cache";

const getBlurHash = async (src: string) => {
  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer);
    console.log({ base64 });
    return base64;
  } catch (err) {
    err;
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, content, subtitle, featuredImageUrl } =
      PostCreationRequestValidator.parse(body);

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userid = session.user.id;
    const blurHash = await getBlurHash(featuredImageUrl);

    if (!blurHash) {
      return new Response("Could not generate blurhash", { status: 500 });
    }

    await prisma.post.create({
      data: {
        title,
        content,
        subtitle,
        author: {
          connect: {
            id: userid,
          },
        },
        featuredImgSrc: featuredImageUrl,
        featuredImgBlurHash: blurHash,
      },
    });
    revalidatePath("/");
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not post to subreddit at this time. Please try later",
      { status: 500 }
    );
  }
}
