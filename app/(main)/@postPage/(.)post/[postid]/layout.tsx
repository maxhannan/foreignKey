export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import PostSheet from "../../components/PostSheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <PostSheet>{children}</PostSheet>
    </main>
  );
}
