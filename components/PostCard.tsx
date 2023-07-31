import type { FC } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PostControls from "./post/PostControls";
import { EyeIcon } from "lucide-react";
import { ExtendedPost } from "@/app/(main)/components/HomepageFeed";
import Link from "next/link";
interface Props {
  post: ExtendedPost;
}

const PostCard: FC<Props> = ({ post }) => {
  return (
    <div className="bg-card  rounded-lg overflow-hidden relative flex flex-col gap-2 group animate-in fade-in duration-700">
      {/* container for image in card */}
      <Link href={`/post/${post.id}`}>
        <div className=" relative h-[300px] rounded-lg overflow-hidden">
          <Image
            src={post.featuredImgSrc}
            alt="Next.js logo"
            className="object-cover"
            fill
            blurDataURL={post.featuredImgBlurHash}
            sizes="(max-height: 300px) 100vw, "
            placeholder="blur"
          />
        </div>
      </Link>
      <div className="  pb-4 flex gap-1 flex-col group">
        <PostControls author={post.author} />
        <Link href={`/post/${post.id}`}>
          <h2 className="text-xl font-semibold text-stone-800 dark:text-white">
            {post.title} -{" "}
            <span className="text-stone-500 font-normal">{post.subtitle}</span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
