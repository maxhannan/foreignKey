import CreateControls from "./components/CreateControls";

export default function createLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container max-w-full pl-0 pr-0 md:pr-1">
      <div className="h-16" />
      {children}
    </main>
  );
}
