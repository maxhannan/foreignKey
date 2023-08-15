"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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

import { useOnScreen } from "@/hooks/useOnScreen";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Like } from "@/db/schema";
import { useSession } from "next-auth/react";
import { useIntersection } from "@mantine/hooks";
import PingContext from "./CommentContext";
interface Props {
  post: PostType;
  likesArr: Like[];
}

const PostButtons: FC<Props> = ({ post, likesArr }) => {
  const user = useSession().data?.user;
  const [liked, setLiked] = useState(
    likesArr.find((l) => l.userId === user?.id) ? true : false
  );
  const [likes, setLikes] = useState(likesArr.length);
  const [saved, setSaved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

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
          likes={likes}
          liked={liked}
          isOnScreen={entry?.isIntersecting}
          setSaved={setSaved}
          setLiked={setLiked}
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
          likes={likes}
          setLikes={setLikes}
          liked={liked}
          setSaved={setSaved}
          setLiked={setLiked}
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
              likes={likes}
              setLikes={setLikes}
              setSaved={setSaved}
              setLiked={setLiked}
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
  likes: number;
  side?: "top" | "right" | "bottom" | "left";
  setLikes: Dispatch<SetStateAction<number>>;
  setSaved: Dispatch<SetStateAction<boolean>>;

  setLiked: Dispatch<SetStateAction<boolean>>;
}
const PostButtonHeading: FC<PostButtonProps> = ({
  post,
  likes,
  side,
  saved,
  liked,
  setSaved,
  setLiked,
}) => {
  const CommentContext = useContext(PingContext);
  console.log({ CommentContext });
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
          liked={liked}
          setLiked={setLiked}
          likes={likes}
          side={side}
        />
        {/* Like count */}
      </div>
    </>
  );
};

type LikeButtonProps = {
  liked: boolean;
  setLiked: Dispatch<SetStateAction<boolean>>;
  likes: number;
  side?: "top" | "right" | "bottom" | "left";
};
export const LikeButton: FC<LikeButtonProps> = ({
  liked,
  setLiked,
  likes,
  side,
}) => {
  const [showLikeCount, setShowLikeCount] = useState(false);

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
          className="bg-transparent"
          onClick={() => {
            setShowLikeCount(true);
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
          {liked ? likes + 1 : likes}
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default PostButtons;
