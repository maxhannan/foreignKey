"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PostType } from "@/db/posts";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  InfoCircledIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { useContext, type Dispatch, type FC, type SetStateAction } from "react";

import { cn } from "@/lib/utils";
import { MessageCircleIcon, ShareIcon } from "lucide-react";

import PingContext from "./CommentContext";
import { Like } from "@/db/schema";
import LikeButton from "./LikeButton";

interface Props {
  post: PostType;
  saved: boolean;
  liked: boolean;

  setSaved: Dispatch<SetStateAction<boolean>>;
  isOnScreen: boolean;
  optomisticLikes: Like[];
  setOptomisticLikes: (action: {
    id: string;
    userId: string;
    postId: string;
    addLike: boolean;
  }) => void;
}

const SideMenu: FC<Props> = ({
  saved,
  liked,
  setSaved,
  post,
  isOnScreen,
  optomisticLikes,
  setOptomisticLikes,
}) => {
  const CommentContext = useContext(PingContext);
  console.log({ CommentContext });
  const { ping, setPing } = CommentContext!;
  return (
    <div
      className={cn(
        " opacity-0 hidden fixed z-50 top-20 right-12   flex-col items-center justify-center space-y-2 animate-in   duration-500   slide-in-from-right fade-in-0 not-prose",
        !isOnScreen && "lg:flex opacity-1"
      )}
    >
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
          setPing(!ping);
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
      <LikeButton post={post} side={"bottom"} />
    </div>
  );
};

export default SideMenu;
