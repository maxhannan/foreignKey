import NavBar from "@/components/NavBar";
import LoadingSkeleton from "../loadingSkeleton";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
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

      <Suspense fallback={<LoadingSkeleton />}>
        {postPage}
        {children}
      </Suspense>
    </main>
  );
}
