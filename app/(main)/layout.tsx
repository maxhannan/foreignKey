import NavBar from "@/components/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({
  children,
  postPage,
}: {
  children: React.ReactNode;
  postPage: React.ReactNode;
}) {
  return (
    <ScrollArea className="h-screen w-full px-4 ">
      <NavBar />
      <div className="h-16" />
      {postPage}
      {children}
    </ScrollArea>
  );
}
