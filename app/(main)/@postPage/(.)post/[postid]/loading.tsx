import LoadingSkeleton from "@/app/loadingSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleDashedIcon } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="container mx-auto  max-w-[1200px] lg:max-w-[70vw] 2xl:max-w-[55vw] 3xl:max-w-[40vw] px-0 prose prose-stone dark:prose-invert mt-2  animate-in fade-in-0  duration-700 break-words mb-4">
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

      <Skeleton className="relative overflow-hidden flex justify-center lg:rounded-lg aspect-[4/3]  not-prose mb-3 mt-3  " />
    </div>
  );
}
