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
      <div className="flex flex-col gap-3">
        <GithubButton setIsLoading={setIsLoading} isLoading={isLoading} />
        <GoogleButton setIsLoading={setIsLoading} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SignInForm;
