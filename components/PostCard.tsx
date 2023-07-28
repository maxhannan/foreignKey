import type { FC } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PostControls from "./post/PostControls";
import { EyeIcon } from "lucide-react";
interface Props {
  imgSrc: string;
}

const PostCard: FC<Props> = async ({ imgSrc }) => {
  return (
    <div className="bg-card  rounded-lg overflow-hidden relative flex flex-col gap-2 group">
      {/* container for image in card */}
      <div className=" relative h-[270px] sm:h-[250px] rounded-lg overflow-hidden">
        <Image src={imgSrc} alt="Next.js logo" className="object-cover" fill />
      </div>
      <div className="  pb-4 flex gap-1 flex-col group">
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
