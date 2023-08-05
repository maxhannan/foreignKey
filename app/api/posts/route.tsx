import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/options";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/lib/config";
import { db } from "@/db";

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

    const posts = await db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.created_at)],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      with: {
        author: {
          columns: {
            name: true,
            image: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
    console;
  }
}
