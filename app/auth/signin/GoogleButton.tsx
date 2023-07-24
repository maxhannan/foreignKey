"use client";
import { Button } from "@/components/ui/button";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { CircleDashedIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}
function GoogleButton({ setIsLoading, isLoading }: Props) {
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        signIn("google");
      }}
    >
      {isLoading ? (
        <CircleDashedIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
      )}{" "}
      Google
    </Button>
  );
}

export default GoogleButton;
