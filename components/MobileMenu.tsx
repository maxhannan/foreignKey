"use client";
import React from "react";
import { Button } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/CustomNavSheet";
import {
  Bookmark,
  Compass,
  GlobeIcon,
  MessagesSquare,
  XIcon,
} from "lucide-react";

function MobileMenu() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className=" group">
            <HamburgerMenuIcon className="h-5 w-5 text-accent-foreground rotate-0   scale-100 transition-all group-data-[state=open]:-rotate-90 group-data-[state=open]:scale-0    " />
            <XIcon className=" absolute h-5 w-5 text-accent-foreground rotate-90 scale-0 transition-all  group-data-[state=open]:rotate-0 group-data-[state=open]:scale-100   " />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className=" md:w-0 md:opacity-0 h-fit w-full md:h-full top-14 border-t border-accent p-4 data-[state=open]:zoom-in data-[state=open]:fade-in "
        >
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              className="py-6 flex justify-start gap-2 text-sm"
            >
              For You <GlobeIcon className="h-4 w-4 ml-1.5" />
            </Button>
            <Button
              variant="ghost"
              className="py-6 flex justify-start gap-2 text-sm"
            >
              Explore <Compass className="h-4 w-4 ml-1.5" />
            </Button>
            <Button
              variant="ghost"
              className="py-6 flex justify-start gap-2 text-sm"
            >
              Messages <MessagesSquare className="h-4 w-4 ml-1.5" />
            </Button>
            <Button
              variant="ghost"
              className="py-6 flex justify-start gap-2 text-sm"
            >
              Boards <Bookmark className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
          {/* divider */}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileMenu;
