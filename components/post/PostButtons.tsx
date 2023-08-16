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
    threshold: 1,
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
              "flex lg:hidden items-center gap-1 justify-between fixed top-14 left-0 w-full bg-background/90 backdrop-blur-xl z-50 p-3 animate-in fade-in-0  duration-300 px-4 border-t shadow-md  "
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
        <LikeButton
          post={post}
          liked={liked}
          optomisticLikes={optomisticLikes}
          setOptomisticLikes={setOptomisticLikes}
          side={side}
        />
        {/* Like count */}
      </div>
    </>
  );
};

type LikeButtonProps = {
  optomisticLikes: Like[];
  setOptomisticLikes: (action: {
    id: string;
    userId: string;
    postId: string;
    addLike: boolean;
  }) => void;
  post: PostType;
  liked: boolean;
  side?: "top" | "right" | "bottom" | "left";
};
export const LikeButton: FC<LikeButtonProps> = ({
  optomisticLikes,
  setOptomisticLikes,
  post,
  side,
  liked,
}) => {
  const user = useSession().data?.user;
  const [showLikeCount, setShowLikeCount] = useState(false);
  let [isPending, startTransition] = useTransition();
  useEffect(() => {
    console.log({ showLikeCount });
    const timer = setTimeout(() => {
      console.log("showLikeCount");
      setShowLikeCount(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [showLikeCount]);

  return (
    <Popover open={showLikeCount}>
      <PopoverTrigger asChild>
        <Button
          size={"icon"}
          variant={"outline"}
          disabled={isPending}
          className="bg-transparent"
          onClick={() => {
            startTransition(async () => {
              if (liked) {
                setOptomisticLikes({
                  id: optomisticLikes.find((l) => l.userId === user?.id)?.id!,
                  userId: user?.id!,
                  postId: post!.id,
                  addLike: false,
                });
                await unlikePostAction({
                  userId: user?.id!,
                  postId: post!.id,
                });
              } else {
                const newLike = {
                  id: createId(),
                  userId: user?.id!,
                  postId: post!.id,
                };
                setOptomisticLikes({
                  ...newLike,
                  addLike: true,
                });
                await likePostAction(newLike);
              }
              setShowLikeCount(true);
            });
          }}
        >
          {isPending ? (
            <CircleDashed className="h-5 w-5 text-pink-500 animate-spin" />
          ) : liked ? (
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
      </PopoverTrigger>
      <PopoverContent
        className="w-fit p-0 border-none bg-transparent"
        side={side}
      >
        <span
          className={`${
            liked
              ? "text-pink-500 dark:text-pink-400"
              : "text-stone-500 dark:text-stone-300"
          } h-9 aspect-square shadow-sm px-2 inline-flex items-center justify-center rounded-md border border-border transition-colors duration-300 ease-in-out  bg-background`}
        >
          {optomisticLikes.length}
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default PostButtons;
