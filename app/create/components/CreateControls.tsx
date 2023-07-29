"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CircleDashedIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";

interface Props {
  submitting: boolean;
}

const CreateControls: FC<Props> = ({ submitting }) => {
  const router = useRouter();

  return (
    <nav className="w-screen min-h-14 h-14  bg-background/30 backdrop-blur-md shadow-sm flex fixed top-0 right-0 left-0  z-50 ">
      <div className="flex items-center justify-between  w-full   gap-2 px-4 lg:px-8">
        <div>
          <Button
            variant="ghost"
            className="px-2"
            onClick={() => router.back()}
            disabled={submitting}
          >
            <XIcon className="mr-2 h-4 w-4 text-accent-foreground " />
            Close
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" disabled={submitting}>
            Save as draft
          </Button>
          <Button
            type="submit"
            form="post-form"
            disabled={submitting}
            className="bg-emerald-200 text-emerald-800 hover:bg-emerald-400 hover:text-emerald-900 shadow-none"
          >
            {submitting ? (
              <>
                <CircleDashedIcon className=" h-4 w-4 mr-2 animate-spin" />
                <span>Publishing...</span>{" "}
              </>
            ) : (
              <span>Publish</span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default CreateControls;
