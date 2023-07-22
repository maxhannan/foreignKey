"use client";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import React from "react";

function GithubButton() {
  const [loading, setLoading] = React.useState(false);
  return (
    <Button
      variant={"outline"}
      size={"lg"}
      className="  text-base "
      onClick={() => {
        setLoading(true);
        signIn("github", { callbackUrl: "/app" });
      }}
    >
      {loading ? (
        <div
          className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        <GitHubLogoIcon className="mr-2 h-4 w-4" />
      )}
      Sign in with Github
    </Button>
  );
}

export default GithubButton;
