"use client";
import { Button } from "@/components/ui/button";

import type { FC } from "react";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const PostModal: FC<Props> = ({ children }) => {
  <div className="z-50 fixed bottom-0 left-0  w-full bg-red-500 animate-in slide-in-from-bottom-96 overflow-y-scroll"></div>;
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      console.log(e.target);
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-50 left-0 right-0 top-0 bottom-0 mx-auto bg-black/50 backdrop-blur-sm "
    >
      {/* close button above modal */}
      <div
        className="flex justify-end w-full items-center  h-[3.4rem]"
        onClick={onDismiss}
        ref={wrapper}
      >
        <Button size={"icon"} variant={"ghost"}>
          <XIcon className=" text-stone-300 transition-all animate-in zoom-in " />
        </Button>
      </div>
      <div className="  animate-in slide-in-from-bottom-96 h-screen fade-in-0 w-full overflow-y-scroll bg-background  rounded-t-md">
        {children}
      </div>
    </div>
  );
};

export default PostModal;
