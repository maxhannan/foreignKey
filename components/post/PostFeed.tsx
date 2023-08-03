"use client";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/lib/config";
import { ExtendedPost } from "@/app/(main)/components/HomepageFeed";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { FC, useEffect, useRef } from "react";
import PostCard from "../PostCard";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  subredditName?: string;
}

const fetchPosts = async (page: number) => {
  const { data } = await axios.get(
    `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${page}}`
  );
  return data as ExtendedPost[];
};

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(["todos"], ({ pageParam = 1 }) => fetchPosts(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.length === INFINITE_SCROLL_PAGINATION_RESULTS
            ? allPages.length + 1
            : undefined;
        return nextPage;
      },
    });
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage(); // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage]);

  const posts =
    data?.pages.flatMap((page) => page) ?? initialPosts.flatMap((page) => page);
  console.log(data?.pages.flatMap((page) => page));

  return (
    <div className="mb-4 mt-2 px-2 xl:px-4">
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6  gap-6 gap-y-4 animate-in fade-in duration-700 ">
        {posts &&
          posts.map((post, index) => {
            if (index === posts.length - 1) {
              return (
                <div key={post.id} ref={ref}>
                  <PostCard post={post} />
                </div>
              );
            }

            return <PostCard key={post.id} post={post} />;
          })}
      </div>
      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
        </li>
      )}
      {!isFetchingNextPage && hasNextPage && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => {
              fetchNextPage();
            }}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
