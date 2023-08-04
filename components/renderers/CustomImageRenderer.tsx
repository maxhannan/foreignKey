"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;
  console.log({ data });
  console.log(data.blurHash);
  return (
    <>
      {data.blurHash && data.aspectRatio ? (
        <div className="relative overflow-hidden flex justify-center lg:rounded-lg  bg-stone-100 dark:bg-stone-800 not-prose mb-3 mt-3 mx-[-1rem] lg:mx-[-5rem] not-prose ">
          <Image
            alt="image"
            src={src}
            blurDataURL={data.blurHash}
            placeholder="blur"
            quality={100}
            height={data.height}
            width={data.width}
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden aspect-[4/3]   bg-stone-100 dark:bg-stone-800 not-prose mb-4  ">
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
      )}
    </>
  );
}
const gcd = (a: number, b: number): number => {
  if (b === 0) return a;
  return gcd(b, a % b);
};
export default CustomImageRenderer;
