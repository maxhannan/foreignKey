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

  if (session) return redirect("/");
  return <SignInForm />;
};

export default SignIn;
