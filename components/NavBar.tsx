import { GlobeIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import type { FC } from "react";
import { ModeToggle } from "./DarkModeToggle";
import MobileMenu from "./MobileMenu";

import UserMenu from "./UserMenu";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { buttonVariants } from "./ui/button";
import { Staatliches } from "next/font/google";
const staatliches = Staatliches({
  weight: "400",
  subsets: ["latin"],
});
interface Props {}

const NavBar: FC<Props> = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-screen min-h-14 h-14 dark:border-b border-muted bg-background/30 backdrop-blur-md shadow-sm flex fixed top-0 right-0 left-0  z-50 ">
      <div className="flex items-center justify-between  w-full   gap-2 px-4">
        <div className="flex items-center gap-4 pt-[2px]">
          <MobileMenu />
          <Link href={"/"} className="">
            <span
              className={`${staatliches.className} font-semibold text-2xl md:text-3xl text-emerald-500 `}
            >
              foreign / key
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Link
              href="/signin"
              className={`${buttonVariants()}  hover:bg-emerald-400 hover:text-emerald-900 transition-colors duration-300 ease-in-out hover:animate-spin `}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
