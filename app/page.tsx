import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Editor from "@/components/Editor";
import axios from "axios";
export const dynamic = "force-dynamic";
import Image from "next/image";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log({ session });

  return (
    // A grid of posts with a sidebar
    <main>
      <div className="grid grid-cols-1  gap-y-2 xl:gap-2 xl:grid-cols-12 xl:max-w-full max-w-[850px]">
        <div className="col-span-4">
          <div className="bg-card dark:border border-accent rounded-lg shadow-md p-4  relative flex flex-col gap-2">
            {/* container for image in card */}
            <div className=" relative h-[250px]">
              <Image
                src="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/568bad9e-560a-4108-c3b8-70da3eb2d300/base"
                alt="Next.js logo"
                className="object-cover"
                fill
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Sidebar
            </h2>
            <p className="text-gray-500 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
              quidem sequi illum facere recusandae voluptatibus
            </p>
          </div>
        </div>
        <div className="col-span-8">
          <Editor />
        </div>
      </div>
    </main>
  );
}
