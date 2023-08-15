import type { FC } from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {}

const UserPopoverSkeleton: FC<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex flex-col justify-center mr-8">
          <Skeleton className="h-8 w-[80px] text-gray-500 dark:text-gray-300 text-base font-bold md:text-lg "></Skeleton>
          <Skeleton className=" h-4 w-[100px] text-gray-500 dark:text-gray-300 text-xs flex-none mt-2"></Skeleton>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[80px] w-[100px] lg:h-[160px] lg:w-[240px] relative" />

            <Skeleton className="h-4 w-[100px] text-gray-500 dark:text-gray-300 text-xs   " />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[80px] w-[100px] lg:h-[160px] lg:w-[240px] relative" />

            <Skeleton className="h-4 w-[100px] text-gray-500 dark:text-gray-300 text-xs   " />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[80px] w-[100px] lg:h-[160px] lg:w-[240px] relative" />

            <Skeleton className="h-4 w-[100px] text-gray-500 dark:text-gray-300 text-xs   " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPopoverSkeleton;
