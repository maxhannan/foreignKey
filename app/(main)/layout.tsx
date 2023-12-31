import NavBar from "@/components/NavBar";
import LoadingSkeleton from "../loadingSkeleton";
import { Suspense } from "react";

export default function Layout({
  children,
  postPage,
}: {
  children: React.ReactNode;
  postPage: React.ReactNode;
}) {
  return (
    <main className="">
      <NavBar />
      <div className="h-2" />
      {postPage}
      <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
    </main>
  );
}
