import { db } from "@/db";
import { PostType } from "@/db/posts";
import { eq, ne } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { Suspense, type FC } from "react";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
interface Props {
  post: PostType;
}

const UserPopoverServer: FC<Props> = async ({ post }) => {
  if (!post) return null;

  const userInfo = await db.query.users.findFirst({
    where: (users) => eq(users.id, post.authorId),

    with: {
      posts: {
        where: (posts) => {
          return eq(posts.authorId, post.authorId) && ne(posts.id, post.id);
        },
        columns: {
          featuredImgSrc: true,
          title: true,
          id: true,
          featuredImgBlurHash: true,
        },
        limit: 3,
      },
    },
  });
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex flex-col justify-center mr-8">
          <span className="text-gray-500 dark:text-gray-300 text-base font-bold md:text-lg ">
            {userInfo!.name}
          </span>
          <span className="text-gray-500 dark:text-gray-300 text-xs flex-none">
            {userInfo!.posts.length} posts
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        {userInfo!.posts.map((post) => (
          <div className="flex flex-col gap-2" key={post.id}>
            <div className="flex flex-col gap-2">
              <div className=" relative flex">
                <Link href={`/post/${post.id}`} replace>
                  <Image
                    src={post.featuredImgSrc}
                    alt=""
                    className="object-cover"
                    height={144}
                    width={180}
                    placeholder="blur"
                    blurDataURL={post.featuredImgBlurHash}
                  />
                </Link>
              </div>

              <span className="text-gray-500 dark:text-gray-300 text-xs   ">
                {post.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPopoverServer;
