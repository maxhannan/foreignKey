import type { FC } from "react";
import Image from "next/image";

import PostControls from "./post/PostControls";

import Link from "next/link";
import { PostType } from "@/db/posts";

interface Props {
  post: PostType;
}

const PostCard: FC<Props> = ({ post }) => {
  if (!post) return null;
  return (
    <div className="bg-card  rounded-lg relative flex flex-col gap-2 group ">
      {/* container for image in card */}
      <Link href={`/post/${post.id}`}>
        <div className=" relative h-[270px] rounded-lg overflow-hidden">
          <Image
            src={post.featuredImgSrc}
            alt="Next.js logo"
            className="object-cover"
            fill
            blurDataURL={post.featuredImgBlurHash}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="  pb-4 flex gap-1 flex-col group">
        <PostControls author={post.author} />
        <Link href={`/post/${post.id}`}>
          <h2 className="text-base font-semibold text-stone-800 dark:text-white">
            {post.title} -{" "}
            <span className="text-stone-500 font-normal">{post.subtitle}</span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
