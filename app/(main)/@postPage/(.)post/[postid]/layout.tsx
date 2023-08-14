import PostSheet from "@/components/post/PostSheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <PostSheet>{children}</PostSheet>
    </main>
  );
}
