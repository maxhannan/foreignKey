"use client";
import { Button } from "@/components/ui/button";
import { EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { CircleDashedIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { ButtonHTMLAttributes, useState } from "react";
import { set } from "zod";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  setLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
}
function GithubButton({ setLoggingIn, ...rest }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      variant="default"
      type="button"
      className="hover:bg-emerald-400 hover:text-emerald-900 transition-colors duration-300 "
      onClick={() => {
        setIsLoading(true);
        setLoggingIn(true);
        signIn("github");
      }}
      {...rest}
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
