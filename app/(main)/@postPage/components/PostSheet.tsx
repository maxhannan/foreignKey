"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-dropdown-menu";
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
    router.back();
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
        side={"bottom"}
        className="top-14 fixed h-full overflow-y-scroll px-0 scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-rounded-2xl  "
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default PostSheet;
