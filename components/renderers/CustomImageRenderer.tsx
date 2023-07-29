"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative  flex justify-center mb-4  max-h-[800px]  ">
      <Image
        alt="image"
        className="object-scale-down rounded-xl "
        height={800}
        width={1000}
        src={src}
      />
    </div>
  );
}

export default CustomImageRenderer;
