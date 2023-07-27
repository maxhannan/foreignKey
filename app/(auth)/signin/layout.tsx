export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="fixed top-0 left-0 w-screen  h-screen overflow-hidden  flex flex-col justify-center items-center">
      {children}
    </main>
  );
}
