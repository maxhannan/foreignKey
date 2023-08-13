"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useRouter } from "next/navigation";
import type { FC } from "react";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const PostSheet: FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const onOpenChange = (open: boolean) => {
    setOpen(open);
    setTimeout(() => {
      router.back();
    }, 300);
  };
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [open]);

  return (
    <Sheet defaultOpen open={open} onOpenChange={onOpenChange}>
      <SheetContent
        ref={ref}
        side={"fullScreen"}
        className="overflow-y-scroll px-0 scrollbar-none lg:scrollbar-thin     "
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default PostSheet;
