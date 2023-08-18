"use client";
import { PostType } from "@/db/posts";
import { LikeCreationRequest } from "@/lib/validators/editor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, type FC, useTransition, useEffect } from "react";
import { Button } from "../ui/button";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Like } from "@/db/schema";
import axios from "axios";
import { CircleDashed } from "lucide-react";

interface Props {
  post: PostType;
}

const LikeButton: FC<Props> = ({ post }) => {
  const user = useSession().data?.user;
  const queryClient = useQueryClient();

  const router = useRouter();
  const [likes, setLikes] = useState<Like[]>([]);
  const { data: dblikes, isFetching } = useQuery({
    queryKey: ["likes", post?.id],
    queryFn: async () => {
      console.log("fetching likes");
      const data = await fetch(`/api/post/likes?postId=${post?.id}`, {
        method: "GET",
      }).then((res) => res.json());
      console.log({ data });
      return data.dblikes as Like[];
    },
    onError: (err) => {
      console.log({ err });
    },
    onSuccess: (data) => {
      console.log({ data });
      setLikes(data);
    },
  });

  const { mutate: likePost, isLoading } = useMutation({
    mutationFn: async ({ postId, userId, liking }: LikeCreationRequest) => {
      const body = { postId, userId, liking };
      const { data } = await axios.patch(`/api/post/likes`, body);
      console.log({ data }, "mutation");
      setLikes(data.dblikes);
      return data;
    },
    onSuccess: (data) => {
      console.log({ data });
      queryClient.invalidateQueries(["likes", post?.id]);
    },
  });

  const liked = likes.some((like) => like.userId === user?.id);
  console.log(likes);
  return (
    <div className="bg-red p-2">
      <Button
        size={"icon"}
        variant={"outline"}
        disabled={isLoading}
        onClick={() => {
          if (liked) {
            likePost({ postId: post!.id, userId: user?.id!, liking: false });
          } else {
            likePost({ postId: post!.id, userId: user?.id!, liking: true });
          }
        }}
      >
        {isFetching ? (
          <HeartIcon className="h-5 w-5 text-zinc-500 animate-pulse" />
        ) : liked ? (
          <HeartFilledIcon
            className={cn(
              " h-5 w-5 text-pink-500 dark:text-pink-400 animate-in transition-all  spin-in-180 "
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
    </div>
  );
};

export default LikeButton;
