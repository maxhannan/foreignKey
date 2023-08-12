import {
  BookmarkIcon,
  ChatBubbleIcon,
  GlobeIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import type { FC } from "react";
import { ModeToggle } from "./DarkModeToggle";
import MobileMenu from "./MobileMenu";

import UserMenu from "./UserMenu";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button, buttonVariants } from "./ui/button";
import { Staatliches } from "next/font/google";
import { cn } from "@/lib/utils";
import { Bell, Bookmark, Compass, MessagesSquare } from "lucide-react";
const staatliches = Staatliches({
  weight: "400",
  subsets: ["latin"],
});
interface Props {}

const NavBar: FC<Props> = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-screen min-h-14 h-14  bg-background shadow-sm flex fixed top-0 right-0 left-0  z-50 ">
      <div className="flex items-center justify-between  w-full   gap-2 px-2 xl:px-4">
        <div className="flex items-center gap-1 ">
          <MobileMenu />
          <Link href={"/"} className="md:pb-.5 pt-.5 md:pt-0 ">
            <span
              className={`${staatliches.className} font-semibold text-2xl  text-emerald-500 align-bottom h-full  `}
            >
              foreign / key
            </span>
          </Link>
          {/* Nav Links */}
          <div
            className={` hidden md:flex items-center gap-6 ml-4 font-semibold text-stone-600 dark:text-white `}
          >
            <Link
              href={"/"}
              className=" relative  font-normal group flex items-center px-2 text-sm"
            >
              For You <GlobeIcon className="h-4 w-4 ml-1.5" />
              {/* hover animated undelrine */}
              <div className="absolute -bottom-5  left-0 w-full h-[2px] bg-emerald-500 rounded-full transform scale-x-0 transition-all group-hover:scale-x-100"></div>
            </Link>
            <Link
              href={"/"}
              className=" relative  font-normal group flex items-center px-2 text-sm"
            >
              Explore <Compass className="h-4 w-4 ml-1.5" />
              {/* hover animated undelrine */}
              <div className="absolute -bottom-5 left-0 w-full h-[2px] bg-emerald-500 rounded-full transform scale-x-0 transition-all group-hover:scale-x-100"></div>
            </Link>
            <Link
              href={"/"}
              className=" relative  font-normal group flex items-center px-2 text-sm"
            >
              Boards <Bookmark className="h-4 w-4 ml-1.5 " />
              {/* hover animated undelrine */}
              <div className="absolute -bottom-5 left-0 w-full h-[2px] bg-emerald-500 rounded-full transform scale-x-0 transition-all group-hover:scale-x-100"></div>
            </Link>
            <Link
              href={"/"}
              className=" relative  font-normal group flex items-center px-2 text-sm"
            >
              Messages <MessagesSquare className="h-4 w-4 ml-1.5" />
              {/* hover animated undelrine */}
              <div className="absolute -bottom-5 left-0 w-full h-[2px] bg-emerald-500 rounded-full transform scale-x-0 transition-all group-hover:scale-x-100"></div>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* search bar  with magnifying glass icon inset inside*/}
          <div className="hidden lg:flex items-center  px-3 bg-accent rounded-lg">
            <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              type="text"
              placeholder="Search"
              className={cn(
                "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 "
              )}
            />
          </div>

          <Button variant="ghost" size="icon" className="rounded-md lg:hidden">
            <MagnifyingGlassIcon className="h-5 w-5  text-accent-foreground " />
          </Button>
          {session?.user && (
            <Button variant="ghost" size="icon" className="rounded-md relative">
              <Bell className="h-5 w-5  text-accent-foreground animate-bounce text-red-500" />
              {/* badge for notificartion */}
            </Button>
          )}
          <ModeToggle />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Link
              href="/signin"
              className={cn([
                `${buttonVariants()} `,
                "hover:bg-emerald-400 hover:text-emerald-900",
              ])}
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
