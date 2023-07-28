import type { FC } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PostControls from "./post/PostControls";
interface Props {
  imgSrc: string;
}

const PostCard: FC<Props> = async ({ imgSrc }) => {
  return (
    <div className="bg-card dark:border border-accent rounded-lg shadow-md overflow-hidden relative flex flex-col gap-2 group">
      {/* container for image in card */}
      <div className=" relative h-[250px]">
        <Image src={imgSrc} alt="Next.js logo" className="object-cover" fill />
      </div>{" "}
      <div className=" absolute bg-background bottom-[6.5rem] rounded-t-md  h-0 overflow-hidden opacity-0 group-hover:h-1/4  group-hover:opacity-100  w-full transition-all duration-300 ">
        <div className="p-4">
          <p className="text-zinc-500 dark:text-zinc-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            veritatis. Sit dignissimos tempora, aspernatur quae facere eveniet
            quasi dolores fugit ullam deserunt vel aliquid adipisci debitis
            ratione modi ducimus autem.
          </p>
        </div>
      </div>
      <div className="px-4 pt-2 pb-4 flex gap-2 flex-col group">
        <PostControls />
        <h2 className="text-xl font-semibold text-stone-800 dark:text-white">
          Quenelle -{" "}
          <span className="text-stone-500 font-normal">Recipe app</span>
        </h2>
      </div>
    </div>
  );
};

export default PostCard;
