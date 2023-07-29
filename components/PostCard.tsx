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

const PostCard: FC<Props> = ({ imgSrc }) => {
  return (
    <div className="bg-card  rounded-lg overflow-hidden relative flex flex-col gap-2 group max-w-[500px]">
      {/* container for image in card */}
      <div className=" relative h-[270px] sm:h-[300px] rounded-lg overflow-hidden">
        <Image
          src={imgSrc}
          alt="Next.js logo"
          className="object-cover"
          fill
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGNQic3VyijXCYoS0jFlyJ0+9/T//x5x6TImjgz8DKzLWzqndmyw8SwDAAE/DdsDUdfPAAAAAElFTkSuQmCC"
          sizes="(max-height: 300px) 100vw, "
          placeholder="blur"
        />
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
