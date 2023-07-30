"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative rounded-lg overflow-hidden   max-h-[766px]  bg-stone-100 dark:bg-stone-800 not-prose   ">
      <Image
        alt="image"
        src={src}
        quality={100}
        height={766}
        width={1366}
        className="object-contain"
        sizes="100vw"
      />
    </div>
  );
}

export default CustomImageRenderer;
