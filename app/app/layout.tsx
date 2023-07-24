import NavBar from "@/components/NavBar";
import { signIn } from "next-auth/react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto max-w-6xl p-2">
      <NavBar />
      <div className="h-16" />
      <div className=" ">{children}</div>
    </main>
  );
}
