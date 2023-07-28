export default function createLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container max-w-full pl-0 pr-1">{children}</main>;
}
