import PostSheet from "../../components/PostSheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <PostSheet>{children}</PostSheet>
    </main>
  );
}
