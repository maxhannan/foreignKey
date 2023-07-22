import { GlobeIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import type { FC } from "react";
import { ModeToggle } from "./DarkModeToggle";
import MobileMenu from "./MobileMenu";
import { getUserByEmail } from "@/lib/user.server";
import UserMenu from "./UserMenu";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

interface Props {}

const NavBar: FC<Props> = async ({}) => {
  const session = await getServerSession(authOptions);
  console.log({ session });
  const user = await getUserByEmail(session!.user!.email!);

  return (
    <nav className="w-screen min-h-14 h-14 dark:border-b border-muted bg-background/30 backdrop-blur-md shadow-sm flex fixed top-0 right-0 left-0  z-50 ">
      <div className="flex items-center justify-between px-6 container mx-auto gap-2">
        <div className="flex items-center gap-4">
          <Link href={"/app"}>
            <div className="flex items-center  gap-1 cursor-pointer">
              <GlobeIcon className="h-7 w-7 text-accent-foreground  text-purple-500 " />
              <span className="font-semibold text-secondary-foreground text-lg   ">
                foreign / key
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserMenu user={user} />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
