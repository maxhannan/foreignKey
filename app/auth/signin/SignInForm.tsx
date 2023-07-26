"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleDashedIcon } from "lucide-react";
import { useState, type FC, FormEvent } from "react";
import GoogleButton from "./GoogleButton";
import GithubButton from "./GithubButton";
import { signIn } from "next-auth/react";

interface Props {}

const SignInForm: FC<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignInEmail = (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const data = signIn("email", {
      callbackUrl: "/app",
      email: e.currentTarget.email.value,
    });
    console.log({ data });
  };
  return (
    <div className="grid gap-6">
      <form onSubmit={(e) => handleSignInEmail(e)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <CircleDashedIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <GithubButton setIsLoading={setIsLoading} isLoading={isLoading} />
        <GoogleButton setIsLoading={setIsLoading} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SignInForm;
