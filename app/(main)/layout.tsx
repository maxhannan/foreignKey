import NavBar from "@/components/NavBar";

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
      <div className="h-16"></div>
      {postPage}
      {children}
    </main>
  );
}
