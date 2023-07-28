"use client";
import { Button } from "@/components/ui/button";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { CircleDashedIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  setLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
}
function GoogleButton({ setLoggingIn, ...rest }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      variant="default"
      type="button"
      onClick={() => {
        setIsLoading(true);
        setLoggingIn(true);
        signIn("google");
      }}
      {...rest}
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
