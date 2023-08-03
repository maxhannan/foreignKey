import { Skeleton } from "@/components/ui/skeleton";
import type { FC } from "react";

interface Props {}

const LoadingSkeleton: FC<Props> = ({}) => {
  return (
    <div className="mb-4 mt-2 px-2 xl:px-4">
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6  gap-6 gap-y-4 ">
        {[...Array(24)].map((_, index) => {
          return (
            <div
              key={index}
              className="bg-card  rounded-lg overflow-hidden relative flex flex-col gap-2 group "
            >
              {/* container for image in card */}

              <Skeleton className=" relative h-[270px] rounded-lg overflow-hidden"></Skeleton>
              <div className="  pb-4 flex gap-1 flex-col group">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
