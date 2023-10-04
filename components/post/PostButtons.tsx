"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

import { experimental_useOptimistic as useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  InfoCircledIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { MessageCircleIcon, ShareIcon } from "lucide-react";
import { PostType } from "@/db/posts";
import SideMenu from "./SideMenu";

import { Like } from "@/db/schema";
import { useSession } from "next-auth/react";
import { useIntersection } from "@mantine/hooks";
import PingContext from "./CommentContext";

import LikeButton from "./LikeButton";
interface Props {
  post: PostType;
  likesArr: Like[];
}

const PostButtons: FC<Props> = ({ post, likesArr }) => {
  const user = useSession().data?.user;

  const [saved, setSaved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const liked = likesArr.find((l) => l.userId === user?.id) ? true : false;

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });
  let isOnScreen = entry?.isIntersecting;
  return (
    <>
      {entry && (
        <SideMenu
          post={post}
          saved={saved}
          liked={liked}
          isOnScreen={entry?.isIntersecting}
          setSaved={setSaved}
        />
      )}
      <div
        className={cn("flex items-center gap-1 justify-between  ")}
        ref={ref}
      >
        <PostButtonHeading
          post={post}
          saved={saved}
          side="top"
          liked={liked}
          setSaved={setSaved}
        />
      </div>

      {isOnScreen ||
        (entry && (
          <div
            className={cn(
              "flex lg:hidden items-center gap-1 justify-between fixed top-14 left-0 w-full bg-background/90 backdrop-blur-xl z-[999] p-3 animate-in fade-in-0  duration-300 px-4 border-t shadow-md  "
            )}
          >
            <PostButtonHeading
              post={post}
              saved={saved}
              side="bottom"
              liked={liked}
              setSaved={setSaved}
            />
          </div>
        ))}
    </>
  );
};

interface PostButtonProps {
  post: PostType;
  saved: boolean;
  liked: boolean;

  side?: "top" | "right" | "bottom" | "left";

  setSaved: Dispatch<SetStateAction<boolean>>;
}
const PostButtonHeading: FC<PostButtonProps> = ({
  post,
  side,
  saved,
  liked,
  setSaved,
}) => {
  const CommentContext = useContext(PingContext);

  const { ping, setPing } = CommentContext!;

  return (
    <>
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
            setPing(!ping);
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
        <LikeButton post={post} side={side} />
        {/* Like count */}
      </div>
    </>
  );
};
export default PostButtons;
