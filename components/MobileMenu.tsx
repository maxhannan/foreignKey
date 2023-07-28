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
} from "@/components/ui/sheet";

function MobileMenu() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className="rounded-full">
            <HamburgerMenuIcon className="h-5 w-5 text-accent-foreground   " />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className=" w-3/4">
          <SheetHeader></SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileMenu;
