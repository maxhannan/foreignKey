import NavBar from "@/components/NavBar";
import LoadingSkeleton from "../loadingSkeleton";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <NavBar />
      <div className="h-16"></div>
      <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
    </main>
  );
}
