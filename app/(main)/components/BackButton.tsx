"use client";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="px-2"
      size={"icon"}
      onClick={() => router.back()}
    >
      <XIcon className=" text-accent-foreground " />
    </Button>
  );
}

export default BackButton;
