import type { FC } from "react";
import GithubButton from "./GithubButton";
import Google from "next-auth/providers/google";
import GoogleButton from "./GoogleButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

interface Props {}

const SignIn: FC<Props> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/app");
  return (
    // login page with github and google buttons
    <div>
      <div className="flex flex-col items-center gap-3 justify-center rounded-xl w-80">
        <h1 className="text-[3rem] font-bold text-center">Sign in</h1>

        <GithubButton />
        <GoogleButton />
      </div>
    </div>
  );
};

export default SignIn;
