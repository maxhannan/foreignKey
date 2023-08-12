import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { getPostsDrizzle } from "./components/HomepageFeed";
import PostFeed from "@/components/post/PostFeed";
import { getAllPostsPaginated } from "@/db/posts";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/lib/config";
import { ComboboxDemo } from "@/components/ui/ComboBox";
import { Button } from "@/components/ui/button";
import { FilterIcon, ListFilterIcon } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const posts = await getAllPostsPaginated({
    limit: INFINITE_SCROLL_PAGINATION_RESULTS,
    offset: 0,
  });

  return (
    // A grid of posts with a sidebar

    <main>
      <div className="px-2 xl:px-4 flex justify-between mb-3 mt-1">
        <ComboboxDemo />
        <Button variant="outline">
          Filters
          <ListFilterIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </div>

      <PostFeed initialPosts={posts} />
    </main>
  );
}
