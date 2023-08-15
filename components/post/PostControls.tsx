"use client";
import { User } from "next-auth";
import { useState, type FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "../ui/button";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import { SaveIcon } from "lucide-react";
import { set } from "zod";
import { cn } from "@/lib/utils";

interface Props {
  author: {
    name: string | null;
    image: string | null;
  };
}

const PostControls: FC<Props> = ({ author }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1234);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex w-full items-center gap-2">
      <Avatar className="h-6 w-6 ">
        <AvatarImage src={author.image || undefined} />

        <AvatarFallback className="bg-secondary">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        </AvatarFallback>
      </Avatar>
      <span className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
        {author.name}
      </span>
      <div className="ml-auto flex items-center gap-1">
        <Button
          size={"icon"}
          variant={"ghost"}
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
          variant={"ghost"}
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
      </div>
    </div>
  );
};

export default PostControls;
