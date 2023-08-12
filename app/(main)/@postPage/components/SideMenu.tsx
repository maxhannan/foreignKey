"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PostType } from "@/db/posts";
import { ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
import type { FC } from "react";

interface Props {
  post: PostType;
}

const SideMenu: FC<Props> = ({ post }) => {
  return (
    <div className=" lg:flex hidden fixed z-50 top-20 right-12   flex-col items-center justify-center space-y-2 animate-in   duration-500   slide-in-from-right fade-in-0 not-prose">
      <Avatar className="h-12 w-12 ">
        <AvatarImage src={post!.author.image || undefined} />

        <AvatarFallback className="bg-secondary">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        </AvatarFallback>
      </Avatar>
      <Button size="icon" variant="outline">
        <HeartIcon
          className={
            " h-5 w-5 text-pink-500 dark:text-pink-400 transition-all animate-in spin-in-180   "
          }
        />
      </Button>
      <Button size="icon" variant="outline">
        <ChatBubbleIcon />
      </Button>
      <Button size="icon" variant="outline">
        <ChatBubbleIcon />
      </Button>
    </div>
  );
};

export default SideMenu;
