import { CircleDashedIcon } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center">
      <CircleDashedIcon className=" h-8 w-8 animate-spin" />
    </div>
  );
}
