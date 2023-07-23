import type { FC } from "react";
import GithubButton from "./GithubButton";
import Google from "next-auth/providers/google";
import GoogleButton from "./GoogleButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleDashedIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import SignInForm from "./SignInForm";

interface Props {}

const SignIn: FC<Props> = async ({}) => {
  const session = await getServerSession(authOptions);
  const isLoading = false;
  if (session) return redirect("/app");
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to sign in.
        </p>
      </div>
      <SignInForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
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

export default SignIn;
