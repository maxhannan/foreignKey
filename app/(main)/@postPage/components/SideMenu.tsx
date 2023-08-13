"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PostType } from "@/db/posts";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  ChatBubbleIcon,
  HeartFilledIcon,
  HeartIcon,
  InfoCircledIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import type { Dispatch, FC, SetStateAction } from "react";
import UserPopover from "./UserPopover";
import UserPopoverServer from "./UserPopoverServer";
import { cn } from "@/lib/utils";
import { MessageCircleIcon, ShareIcon } from "lucide-react";

interface Props {
  post: PostType;
  saved: boolean;
  liked: boolean;
  setSaved: Dispatch<SetStateAction<boolean>>;

  setLiked: Dispatch<SetStateAction<boolean>>;
}

const SideMenu: FC<Props> = ({ saved, liked, setSaved, setLiked }) => {
  return (
    <div className=" lg:flex hidden fixed z-50 top-20 right-12   flex-col items-center justify-center space-y-2 animate-in   duration-500   slide-in-from-right fade-in-0 not-prose">
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
    </div>
  );
};

export default SideMenu;
