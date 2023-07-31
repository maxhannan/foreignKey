"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative rounded-lg overflow-hidden aspect-[4/3]   bg-stone-100 dark:bg-stone-800 not-prose   ">
      <Image
        alt="image"
        src={src}
        quality={100}
        fill
        onLoadingComplete={(img) => {}}
        className="object-contain"
        sizes="100vw"
      />
    </div>
  );
}
const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  return gcd(b, a % b);
};
export default CustomImageRenderer;
