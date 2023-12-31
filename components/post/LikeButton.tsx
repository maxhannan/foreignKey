"use client";
import { PostType } from "@/db/posts";
import { LikeCreationRequest } from "@/lib/validators/editor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, type FC, useEffect, use } from "react";
import { Button } from "../ui/button";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

import { Like } from "@/db/schema";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import React from "react";
import { CircleDashed } from "lucide-react";

interface Props {
  post: PostType;
  side?: "left" | "right" | "top" | "bottom";
}

const LikeButton: FC<Props> = ({ post, side = "top" }) => {
  const user = useSession().data?.user;
  const queryClient = useQueryClient();

  const [liked, setLiked] = useState(false);
  const [showLikeCount, setShowLikeCount] = useState(false);

  const { data, isInitialLoading } = useQuery({
    queryKey: ["likes", post?.id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/post/likes?postId=${post?.id}`);

      return data.dblikes as Like[];
    },
    onError: (err) => {
      console.log({ err });
    },
    onSuccess: (data) => {
      setLiked(data?.some((like) => like.userId === user?.id));
    },
  });

  const { mutate: likePost, isLoading } = useMutation({
    mutationFn: async ({ postId, userId, liking }: LikeCreationRequest) => {
      const body = { postId, userId, liking };

      const { data } = await axios.patch(`/api/post/likes`, body);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post?.id]);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLikeCount(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [showLikeCount]);
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
            <HeartFilledIcon
              className={cn(" h-5 w-5 text-zinc-500  animate-pulse  ")}
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
        className="w-fit p-0 border-none bg-transparent animate-in zoom-in-0 z-50"
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
            <span className="animate-in fade-in-0 duration-500">
              {data ? data.length : 0}
            </span>
          )}
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default LikeButton;
