import { CircleDashedIcon } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed z-50 left-0 right-0 top-0 bottom-0 flex justify-center items-center animate-in fade-in-0 mx-auto bg-black/50 backdrop-blur-sm">
      <CircleDashedIcon className=" h-8 w-8 animate-spin" />
    </div>
  );
}
