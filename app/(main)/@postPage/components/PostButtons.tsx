"use client";
import { FC, useRef, useState } from "react";

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
import SideMenu from "./SideMenu";
import { forwardRef } from "react";
import UserPopover from "./UserPopover";
import { useIntersection } from "@mantine/hooks";
interface Props {
  post: PostType;
}

const PostButtons: FC<Props> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1234);
  const [saved, setSaved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  console.log(containerRef, "containerRef");
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0,
  });
  return (
    <>
      {" "}
      {entry?.isIntersecting ? null : (
        <SideMenu
          post={post}
          saved={saved}
          liked={liked}
          setSaved={setSaved}
          setLiked={setLiked}
        />
      )}
      <div
        className={cn("flex items-center gap-1 justify-between  ")}
        ref={ref}
      >
        <div className="mr-auto flex gap-2 bg-background">
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
                  "h-5 w-5 text-amber-500 dark:text-amber-400 transition-all  zoom-in "
                )}
              />
            ) : (
              <InfoCircledIcon className="h-5 w-5 text-gray-500 dark:text-gray-300   zoom-in " />
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
                  "h-5 w-5 text-amber-500 dark:text-amber-400 transition-all  zoom-in "
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
            className="bg-transparent"
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

        {entry?.isIntersecting ? null : (
          <div
            className={cn(
              "flex lg:hidden items-center gap-1 justify-between fixed top-14 left-0 w-full bg-background/90 backdrop-blur-xl z-50 p-3 animate-in fade-in-0  duration-300 px-4 border-t shadow-md  "
            )}
          >
            <div className="mr-auto flex gap-2 ">
              <Button
                size={"icon"}
                variant={"outline"}
                className="bg-transparent"
                onClick={() => {
                  setSaved(!saved);
                }}
              >
                {saved ? (
                  <InfoCircledIcon
                    className={cn(
                      "h-5 w-5 text-amber-500 dark:text-amber-400 transition-all  zoom-in "
                    )}
                  />
                ) : (
                  <InfoCircledIcon className="h-5 w-5 text-gray-500 dark:text-gray-300   zoom-in " />
                )}
              </Button>
              <Button
                size={"icon"}
                variant={"outline"}
                className="bg-transparent"
                onClick={() => {
                  setLiked(!liked);
                }}
              >
                {liked ? (
                  <MessageCircleIcon
                    className={cn(
                      "h-5 w-5 text-amber-500 dark:text-amber-400 transition-all  zoom-in "
                    )}
                  />
                ) : (
                  <MessageCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-300   zoom-in " />
                )}

                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
            <div className=" ml-auto flex gap-2">
              <Button
                size={"icon"}
                variant={"outline"}
                className="bg-transparent"
                onClick={() => {
                  setSaved(!saved);
                }}
              >
                {saved ? (
                  <BookmarkFilledIcon
                    className={cn(
                      "h-5 w-5 text-amber-500 dark:text-amber-400 transition-all  zoom-in "
                    )}
                  />
                ) : (
                  <BookmarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-300   zoom-in " />
                )}
              </Button>
              <Button
                size={"icon"}
                variant={"outline"}
                className="bg-transparent"
                onClick={() => {
                  setSaved(!saved);
                }}
              >
                {saved ? (
                  <ShareIcon
                    className={cn(
                      "h-5 w-5 text-amber-500 dark:text-amber-400 transition-all  zoom-in "
                    )}
                  />
                ) : (
                  <Share2Icon className="h-5 w-5 text-gray-500 dark:text-gray-300   zoom-in " />
                )}
              </Button>
              <Button
                size={"icon"}
                variant={"outline"}
                className="bg-transparent"
                onClick={() => {
                  setLiked(!liked);
                }}
              >
                {liked ? (
                  <HeartFilledIcon
                    className={cn(
                      "absolute h-5 w-5 text-pink-500 dark:text-pink-400 transition-all  spin-in-180 "
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
              {/* Like count */}
              <span
                className={`${
                  liked
                    ? "text-pink-500 dark:text-pink-400"
                    : "text-stone-500 dark:text-stone-300"
                } h-9 shadow-sm px-2 inline-flex items-center rounded-md border border-border transition-colors duration-300 ease-in-out  bg-transparent`}
              >
                {liked ? likes + 1 : likes}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostButtons;
