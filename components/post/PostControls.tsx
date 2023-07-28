"use client";
import { User } from "next-auth";
import { useState, type FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "../ui/button";
import {
  BookmarkIcon,
  HeartFilledIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import { SaveIcon } from "lucide-react";
import { set } from "zod";
import { cn } from "@/lib/utils";

interface Props {}

const PostControls: FC<Props> = () => {
  const session = useSession();
  const [effect, setEffect] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1234);

  return (
    <div className="flex w-full items-center gap-2">
      <Avatar className="h-5 w-5 ">
        <AvatarImage src={session.data?.user.image || undefined} />

        <AvatarFallback className="bg-secondary">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        </AvatarFallback>
      </Avatar>
      <span className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
        {session.data?.user.name}
      </span>
      <div className="ml-auto flex items-center gap-1">
        <Button size={"icon"} variant={"ghost"}>
          <BookmarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-300 " />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setLiked(!liked);
          }}
        >
          <HeartFilledIcon
            className={cn(
              "absolute h-5 w-5 text-pink-500 dark:text-pink-400 transition-all rotate-90 scale-0",
              {
                "rotate-0 scale-100": liked,
              }
            )}
          />
          <HeartIcon
            className={cn(
              "absolute h-5 w-5 text-pink-500 dark:text-pink-400 transition-all rotate-0 scale-100 ",
              {
                "rotate-90 scale-0": liked,
              }
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
        {/* Like count */}
        <span
          className={`${
            liked
              ? "text-pink-500 dark:text-pink-400"
              : "text-stone-500 dark:text-stone-300"
          } px-2 py-1.5 rounded-md bg-stone-100 dark:bg-stone-800 transition-colors duration-300 ease-in-out  `}
        >
          {liked ? likes + 1 : likes}
        </span>
      </div>
    </div>
  );
};

export default PostControls;
