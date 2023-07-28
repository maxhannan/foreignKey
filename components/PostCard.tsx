import type { FC } from "react";
import Image from "next/image";
interface Props {}

const PostCard: FC<Props> = ({}) => {
  return (
    <div className="bg-card dark:border border-accent rounded-lg shadow-md overflow-hidden relative flex flex-col gap-2">
      {/* container for image in card */}
      <div className=" relative h-[250px]">
        <Image
          src="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/568bad9e-560a-4108-c3b8-70da3eb2d300/base"
          alt="Next.js logo"
          className="object-cover"
          fill
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Sidebar
        </h2>
        <p className="text-gray-500 dark:text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
          quidem sequi illum facere recusandae voluptatibus
        </p>
      </div>
    </div>
  );
};

export default PostCard;
