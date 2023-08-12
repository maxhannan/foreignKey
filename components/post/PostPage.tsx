"use client";
import PostHeading from "@/app/(main)/@postPage/components/PostHeading";
import SideMenu from "@/app/(main)/@postPage/components/SideMenu";
import { useRef, type FC, Fragment } from "react";
import EditorOutput from "../EditorOutput";
import { PostType } from "@/db/posts";
import { useIntersection } from "@mantine/hooks";

interface Props {
  post: PostType;
}

const PostPage: FC<Props> = ({ post }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  console.log(containerRef, "containerRef");
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.5,
  });
  if (!post) return null;
  console.log(entry, "je;ll;");

  return (
    <>
      {entry?.isIntersecting ? null : <SideMenu post={post} />}
      <div className="container mx-auto  max-w-[100vw] lg:max-w-[70vw]   3xl:max-w-[45vw]  prose prose-stone dark:prose-invert mt-2  animate-in fade-in-0  duration-300 break-words mb-4 pb-16 px-4 lg:px-24">
        {/* fixed position vertical buttons */}

        <PostHeading post={post} ref={ref} />
        <EditorOutput content={post.content} />
      </div>
    </>
  );
};

export default PostPage;
