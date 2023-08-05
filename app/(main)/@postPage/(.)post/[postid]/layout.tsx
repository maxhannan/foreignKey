import PostSheet from "../../components/PostSheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <PostSheet>{children}</PostSheet>
    </main>
  );
}
