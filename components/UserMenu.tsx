"use client";
import { getUserByEmail } from "@/lib/user.server";
import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut } from "next-auth/react";
import { PersonIcon } from "@radix-ui/react-icons";
import { User2Icon, UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import { User } from "next-auth";
import Link from "next/link";
interface Props {
  user: User;
}

const UserMenu: FC<Props> = ({ user }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {user?.image ? (
            <div className=" data-[state=open]:bg-gradient-to-r bg-transparent group data-[state=open]:text-muted from-pink-500 via-red-500 to-yellow-500 p-0.5 rounded-full">
              <Avatar className="h-8 w-8  rounded-full">
                <AvatarImage src={user!.image || undefined} />

                <AvatarFallback className="bg-secondary">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                  </span>
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="rounded-full">
              <User2Icon className="h-5 w-5 rotate-0 text-accent-foreground " />
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Avatar className="h-6 w-6  rounded-full">
              <AvatarImage src={user!.image || undefined} />

              <AvatarFallback className="bg-secondary">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
              </AvatarFallback>
            </Avatar>
            <span className="text-stone-700 dark:text-stone-300 text-sm md:text-sm">
              {user!.name}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={"/create"}>
              <Button
                variant={"secondary"}
                size={"lg"}
                className="w-full  hover:bg-emerald-300 hover:text-emerald-900"
              >
                Share your work
              </Button>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
