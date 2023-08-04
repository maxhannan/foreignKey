"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleDashedIcon } from "lucide-react";
import { useState, type FC, FormEvent } from "react";
import GoogleButton from "./GoogleButton";
import GithubButton from "./GithubButton";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface Props {}

const SignInForm: FC<Props> = ({}) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Use one of the following providers to sign in.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-3">
          <GithubButton setLoggingIn={setLoggingIn} disabled={loggingIn} />
          <GoogleButton setLoggingIn={setLoggingIn} disabled={loggingIn} />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or Continue with
            </span>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="username">
                Username
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={loggingIn}
              />
            </div>

            <Button
              variant={"outline"}
              onClick={() => signIn("email", { email })}
              disabled={loggingIn}
            >
              Sign In with Email
            </Button>
          </div>
        </form>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground hidden sm:block">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default SignInForm;
