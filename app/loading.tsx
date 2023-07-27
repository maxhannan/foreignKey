import { CircleDashedIcon } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 flex items-center justify-center">
      {/* pulsing loading indicator */}
      <div className="flex items-center justify-center">
        <CircleDashedIcon className=" h-8 w-8 animate-spin" />
      </div>
    </div>
  );
}
