import PostSheet from "@/components/post/PostSheet";
export const revalidate = 0;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <PostSheet>{children}</PostSheet>
    </main>
  );
}
