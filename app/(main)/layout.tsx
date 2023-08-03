import NavBar from "@/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <NavBar />
      <div className="h-16"></div>

      {children}
    </main>
  );
}
