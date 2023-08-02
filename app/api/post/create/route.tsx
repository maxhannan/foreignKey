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

    const imgData = await getPlaiceholder(buffer);

    return imgData;
  } catch (err) {
    err;
  }
};

const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  return gcd(b, a % b);
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
    const imgData = await getBlurHash(featuredImageUrl);

    if (!imgData) {
      console.log("Could not generate blurhash");
      return new Response("Could not generate blurhash", { status: 500 });
    }
    const formattedContent = {
      ...content,
      blocks: await Promise.all(
        content.blocks.map(async (block: any) => {
          console.log({ block });
          if (block.type === "image") {
            const imgMetaData = await getBlurHash(block.data.file.url);
            console.log(block.data.file.url, "url");

            if (!imgMetaData) {
              console.log("Could not generate blurhash");
              return new Response("Could not generate blurhash", {
                status: 500,
              });
            }
            return {
              ...block,
              data: {
                ...block.data,
                blurHash: imgMetaData.base64,
                width: imgMetaData.metadata.width,
                height: imgMetaData.metadata.height,
                aspectRatio: `aspect-[${
                  imgMetaData.metadata.width /
                  gcd(imgMetaData.metadata.width, imgMetaData.metadata.height)
                }/${
                  imgMetaData.metadata.height /
                  gcd(imgMetaData.metadata.width, imgMetaData.metadata.height)
                }]`,
              },
            };
          }
          return block;
        })
      ),
    };
    console.log(formattedContent.blocks, "BLOCKS");
    await prisma.post.create({
      data: {
        title,
        content: formattedContent,
        subtitle,
        author: {
          connect: {
            id: userid,
          },
        },
        featuredImgSrc: featuredImageUrl,
        featuredImgBlurHash: imgData.base64,
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
