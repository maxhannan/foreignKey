"use client";
import { Button } from "@/components/ui/button";
import { EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { CircleDashedIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}
function GithubButton({ setIsLoading, isLoading }: Props) {
  return (
    <Button
      variant="default"
      type="button"
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        signIn("github");
      }}
    >
      {isLoading ? (
        <CircleDashedIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <GitHubLogoIcon className="mr-2 h-4 w-4" />
      )}
      Github
    </Button>
  );
}

export default GithubButton;
