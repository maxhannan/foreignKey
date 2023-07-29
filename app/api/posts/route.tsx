import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { getPosts } from "@/app/(main)/components/HomepageFeed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/lib/config";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams;
  console.log({ url });
  const session = await getServerSession(authOptions);

  try {
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: params.get("limit"),
        page: params.get("page"),
      });

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
    });
    console.log({ posts });
    return new Response(JSON.stringify(posts));
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
