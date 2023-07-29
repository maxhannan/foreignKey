"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";

interface Props {}

const CreateControls: FC<Props> = ({}) => {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <nav className="w-screen min-h-14 h-14  bg-background/30 backdrop-blur-md shadow-sm flex fixed top-0 right-0 left-0  z-50 ">
      <div className="flex items-center justify-between  w-full   gap-2 px-4 lg:px-8">
        <div>
          <Button
            variant="ghost"
            className="px-2"
            onClick={() => router.back()}
          >
            <XIcon className="mr-2 h-4 w-4 text-accent-foreground " />
            Close
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Save as draft</Button>
          <Button
            onClick={() =>
              toast({
                title: "Post published",
                description: "Your post has been published",
                variant: "success",
              })
            }
            className="bg-emerald-200 text-emerald-800 hover:bg-emerald-400 hover:text-emerald-900 shadow-none"
          >
            Publish
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default CreateControls;
