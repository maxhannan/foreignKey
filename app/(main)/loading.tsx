import { CircleDashedIcon } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-screen flex justify-center mt-32">
      <CircleDashedIcon className=" h-8 w-8 animate-spin" />
    </div>
  );
}
