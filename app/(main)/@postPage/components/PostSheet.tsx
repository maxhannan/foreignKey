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
import React from "react";

interface Props {
  children: React.ReactNode;
}

const PostSheet: FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const onOpenChange = (open: boolean) => {
    if (open === false) {
      router.back();
    }
    setOpen(open);
  };
  return (
    <Sheet defaultOpen open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={"bottom"}
        className="top-14 fixed h-full overflow-y-scroll px-0"
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default PostSheet;
