"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { LikeCreationRequest } from "@/lib/validators/editor";
import { experimental_useOptimistic as useOptimistic } from "react";
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
import { CircleDashed, MessageCircleIcon, ShareIcon } from "lucide-react";
import { PostType, unlikePost } from "@/db/posts";
import SideMenu from "./SideMenu";

import { useOnScreen } from "@/hooks/useOnScreen";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Like } from "@/db/schema";
import { useSession } from "next-auth/react";
import { useIntersection } from "@mantine/hooks";
import PingContext from "./CommentContext";
import { createId } from "@paralleldrive/cuid2";
import { likePostAction, unlikePostAction } from "@/actions/actions";
import { set } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import LikeButton from "./LikeButton";
interface Props {
  post: PostType;
  likesArr: Like[];
}

const PostButtons: FC<Props> = ({ post, likesArr }) => {
  const user = useSession().data?.user;

  const [saved, setSaved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [optomisticLikes, setOptomisticLikes] = useOptimistic(
    likesArr,
    (
      state,
      like: {
        id: string;
        userId: string;
        postId: string;
        addLike: boolean;
      }
    ) => {
      if (like.addLike) {
        return [
          ...state,
          { id: like.id, userId: like.userId, postId: like.postId },
        ];
      } else {
        let newState = [...state].filter((like) => like.userId !== user?.id);
        return newState;
      }
    }
  );

  console.log({ optomisticLikes });
  const liked = optomisticLikes.find((l) => l.userId === user?.id)
    ? true
    : false;
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.2,
  });
  let isOnScreen = entry?.isIntersecting;
  return (
    <>
      {entry && (
        <SideMenu
          post={post}
          saved={saved}
          optomisticLikes={optomisticLikes}
          setOptomisticLikes={setOptomisticLikes}
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
          optomisticLikes={optomisticLikes}
          setOptomisticLikes={setOptomisticLikes}
          liked={liked}
          setSaved={setSaved}
        />
      </div>

      {isOnScreen ||
        (entry && (
          <div
            className={cn(
              "flex lg:hidden items-center gap-1 justify-between fixed top-0 left-0 w-full bg-background/90 backdrop-blur-xl z-[999] p-3 animate-in fade-in-0  duration-300 px-4 border-t shadow-md  "
            )}
          >
            <PostButtonHeading
              post={post}
              saved={saved}
              side="bottom"
              liked={liked}
              optomisticLikes={optomisticLikes}
              setOptomisticLikes={setOptomisticLikes}
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
  optomisticLikes: Like[];
  setOptomisticLikes: (action: {
    id: string;
    userId: string;
    postId: string;
    addLike: boolean;
  }) => void;
}
const PostButtonHeading: FC<PostButtonProps> = ({
  post,
  side,
  saved,
  liked,
  setSaved,
  optomisticLikes,
  setOptomisticLikes,
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
