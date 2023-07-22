export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 flex items-center justify-center">
      {/* pulsing loading indicator */}
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 bg-purple-500 rounded-full  animate-ping mr-1"></div>
      </div>
    </div>
  );
}
