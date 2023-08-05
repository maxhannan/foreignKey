"use client";
import { useState, type FC } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  HeartFilledIcon,
  HeartIcon,
  InfoCircledIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { MessageCircleIcon, ShareIcon } from "lucide-react";
import { PostType } from "@/db/posts";

interface Props {
  post: PostType;
}

const PostHeading: FC<Props> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1234);
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex   gap-4 flex-col not-prose justify-between">
      <div className="flex gap-4 items-center">
        {" "}
        <div className="">
          <Avatar className="h-12 w-12 ">
            <AvatarImage src={post!.author.image || undefined} />

            <AvatarFallback className="bg-secondary">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center mr-8">
          <span className="text-gray-500 dark:text-gray-300 text-base font-bold md:text-lg ">
            {post!.title}
          </span>
          <span className="text-gray-500 dark:text-gray-300 text-xs flex-none">
            {post!.author.name}
          </span>
        </div>
      </div>
      <div className=" flex items-center gap-1 justify-between w-full">
        <div className="mr-auto flex gap-2">
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              setSaved(!saved);
            }}
          >
            {saved ? (
              <InfoCircledIcon
                className={cn(
                  "h-5 w-5 text-amber-500 dark:text-amber-400 transition-all animate-in zoom-in "
                )}
              />
            ) : (
              <InfoCircledIcon className="h-5 w-5 text-gray-500 dark:text-gray-300  animate-in zoom-in " />
            )}
          </Button>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              setLiked(!liked);
            }}
          >
            {liked ? (
              <MessageCircleIcon
                className={cn(
                  "h-5 w-5 text-amber-500 dark:text-amber-400 transition-all animate-in zoom-in "
                )}
              />
            ) : (
              <MessageCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-300  animate-in zoom-in " />
            )}

            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <div className=" ml-auto flex gap-2">
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              setSaved(!saved);
            }}
          >
            {saved ? (
              <BookmarkFilledIcon
                className={cn(
                  "h-5 w-5 text-amber-500 dark:text-amber-400 transition-all animate-in zoom-in "
                )}
              />
            ) : (
              <BookmarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-300  animate-in zoom-in " />
            )}
          </Button>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              setSaved(!saved);
            }}
          >
            {saved ? (
              <ShareIcon
                className={cn(
                  "h-5 w-5 text-amber-500 dark:text-amber-400 transition-all animate-in zoom-in "
                )}
              />
            ) : (
              <Share2Icon className="h-5 w-5 text-gray-500 dark:text-gray-300  animate-in zoom-in " />
            )}
          </Button>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => {
              setLiked(!liked);
            }}
          >
            {liked ? (
              <HeartFilledIcon
                className={cn(
                  "absolute h-5 w-5 text-pink-500 dark:text-pink-400 transition-all animate-in spin-in-180 "
                )}
              />
            ) : (
              <HeartIcon
                className={cn(
                  " h-5 w-5 text-pink-500 dark:text-pink-400 transition-all animate-in spin-in-180   "
                )}
              />
            )}

            <span className="sr-only">Toggle theme</span>
          </Button>
          {/* Like count */}
          <span
            className={`${
              liked
                ? "text-pink-500 dark:text-pink-400"
                : "text-stone-500 dark:text-stone-300"
            } h-9 shadow-sm px-2 inline-flex items-center rounded-md border border-border transition-colors duration-300 ease-in-out  `}
          >
            {liked ? likes + 1 : likes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostHeading;
