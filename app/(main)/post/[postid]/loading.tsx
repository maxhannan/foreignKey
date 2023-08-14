import LoadingSkeleton from "@/app/loadingSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleDashedIcon } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container mx-auto  max-w-[1200px]   2xl:max-w-[75vw] 4xl:max-w-[45vw]    prose prose-stone dark:prose-invert mt-2  animate-in fade-in-0  duration-300 break-words mb-4 pb-16 px-4 lg:px-20">
      <div className=" mb-3 flex justify-between px-4 lg:px-0">
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-12 w-[350px]" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>
      <div className="flex gap-2  px-4 pr-6 lg:px-0 justify-between">
        <Skeleton className="h-8 w-8 rounded-full flex-none" />
        <Skeleton className="h-8 w-full  " />
      </div>

      <Skeleton className="relative overflow-hidden flex justify-center lg:rounded-lg aspect-[4/3] mx-[-1rem] lg:mx-[-5rem] not-prose mb-3 mt-3  " />
    </div>
  );
}
