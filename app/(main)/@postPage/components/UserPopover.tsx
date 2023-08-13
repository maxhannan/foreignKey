"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PostType } from "@/db/posts";
import { Label } from "@radix-ui/react-dropdown-menu";
import type { FC } from "react";

interface Props {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  post: PostType;
}

const UserPopover: FC<Props> = ({ children, side, post }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="h-12 w-12 data-[state=open]:border ">
          <AvatarImage src={post!.author.image || undefined} />

          <AvatarFallback className="bg-secondary">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent side={side} align="start" className="w-fit">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
