"use client";
import { PostType } from "@/db/posts";
import { LikeCreationRequest } from "@/lib/validators/editor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, type FC, useEffect } from "react";
import { Button } from "../ui/button";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Like } from "@/db/schema";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { set } from "zod";
import React from "react";
import { CircleDashed } from "lucide-react";

interface Props {
  post: PostType;
  side?: "left" | "right" | "top" | "bottom";
}

const LikeButton: FC<Props> = ({ post, side = "top" }) => {
  const user = useSession().data?.user;
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(
    post?.likes.some((like) => like.userId === user?.id)
  );

  const [showLikeCount, setShowLikeCount] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("showLikeCount");
      setShowLikeCount(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [showLikeCount]);
  const {
    data: dblikes,
    isRefetching,
    isInitialLoading,
  } = useQuery({
    queryKey: ["likes", post?.id],
    queryFn: async () => {
      console.log("fetching likes");
      const data = await fetch(`/api/post/likes?postId=${post?.id}`, {
        method: "GET",
      }).then((res) => res.json());
      console.log({ data });
      return data.dblikes as Like[];
    },
    onError: (err) => {
      console.log({ err });
    },
    onSuccess: (data) => {
      console.log({ data });
      setLiked(data?.some((like) => like.userId === user?.id));
    },
  });

  const { mutate: likePost, isLoading } = useMutation({
    mutationFn: async ({ postId, userId, liking }: LikeCreationRequest) => {
      const body = { postId, userId, liking };

      const { data } = await axios.patch(`/api/post/likes`, body);
      console.log({ data }, "mutation");

      return data;
    },
    onSuccess: (data) => {
      console.log({ data });
      queryClient.invalidateQueries(["likes", post?.id]);
    },
  });

  return (
    <Popover open={showLikeCount}>
      <PopoverTrigger asChild>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            if (liked) {
              likePost({
                postId: post!.id,
                userId: user?.id!,
                liking: false,
              });
            } else {
              likePost({ postId: post!.id, userId: user?.id!, liking: true });
            }
            setLiked(!liked);
            setShowLikeCount(true);
          }}
        >
          {isInitialLoading ? (
            <HeartIcon
              className={cn(
                " h-5 w-5 text-zinc-500 dark:text-pink-400 animate-in transition-all  zoom-in "
              )}
            />
          ) : liked ? (
            <HeartFilledIcon
              className={cn(
                " h-5 w-5 text-pink-500 dark:text-pink-400 animate-in transition-all  zoom-in "
              )}
            />
          ) : (
            <HeartIcon
              className={cn(
                " h-5 w-5 text-pink-500 dark:text-pink-400 transition-all  spin-in-180   "
              )}
            />
          )}

          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        alignOffset={100}
        className="w-fit p-0 border-none bg-transparent animate-in zoom-in-0 z-30"
        side={side}
      >
        <span
          className={`${
            liked
              ? " dark:text-pink-400 border-pink-500 bg-pink-200 text-pink-900"
              : "dark:text-stone-400 border-stone-400 bg-stone-300 text-zinc-900"
          } h-9 aspect-square shadow-sm px-2 inline-flex items-center justify-center rounded-md border  transition-colors duration-300 ease-in-out  bg-background `}
        >
          {isLoading ? (
            <CircleDashed
              className={cn(
                " h-5 w-5 text-zinc-500 dark:text-pink-400 animate-spin"
              )}
            />
          ) : (
            <span className="animate-in fade-in-0 duration-500">2.9k</span>
          )}
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default LikeButton;
