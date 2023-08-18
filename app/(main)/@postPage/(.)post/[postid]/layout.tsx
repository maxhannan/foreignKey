import PostSheet from "@/components/post/PostSheet";
export const revalidate = 0;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <PostSheet>{children}</PostSheet>
    </main>
  );
}
