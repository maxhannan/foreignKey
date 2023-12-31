import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/ImageModal";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative overflow-hidden flex justify-center lg:rounded-lg  bg-stone-100 dark:bg-stone-800 not-prose mb-3 mt-3 mx-[-1rem] lg:mx-[-5rem] not-prose ">
      <Image
        alt="image"
        src={src}
        blurDataURL={data.blurHash}
        placeholder="blur"
        quality={100}
        height={data.height}
        width={data.width}
        sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 75vw, (max-width: 1700px) 65vw,  45vw"
      />
    </div>
  );
}

export default CustomImageRenderer;
