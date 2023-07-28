"use client";
import { User } from "next-auth";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "../ui/button";
import { BookmarkIcon, HeartIcon } from "@radix-ui/react-icons";
import { SaveIcon } from "lucide-react";

interface Props {}

const PostControls: FC<Props> = () => {
  const session = useSession();

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
      <span className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
        {session.data?.user.name}
      </span>
      <div className="ml-auto flex items-center gap-1">
        <Button size={"icon"} variant={"ghost"}>
          <BookmarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <HeartIcon className="h-5 w-5 text-pink-500 dark:text-pink-400" />
        </Button>
        {/* Like count */}
        <span className=" px-2 py-1.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-300">
          128
        </span>
      </div>
    </div>
  );
};

export default PostControls;
