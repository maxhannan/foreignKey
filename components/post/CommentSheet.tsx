"use client";
import { useContext, type FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import PingContext from "./CommentContext";

interface Props {
  children: React.ReactNode;
}

const CommentSheet: FC<Props> = ({ children }) => {
  const CommentContext = useContext(PingContext);

  const { ping, setPing } = CommentContext!;
  return (
    <>
      <Sheet open={ping} onOpenChange={setPing}>
        <SheetContent side={"rightNoOverlay"} className=" ">
          {children}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CommentSheet;
