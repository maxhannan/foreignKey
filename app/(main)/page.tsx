import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Editor from "@/components/Editor";
import axios from "axios";
export const dynamic = "force-dynamic";
import Image from "next/image";
import PostCard from "@/components/PostCard";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log({ session });

  return (
    // A grid of posts with a sidebar
    <main className="px-4">
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5  gap-6 gap-y-4">
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/568bad9e-560a-4108-c3b8-70da3eb2d300/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/16d7982a-faae-4eaf-bb28-c209cfdaa300/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/ace412da-826b-44a0-122d-78c05c209700/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />{" "}
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/8f7e82d1-2a0f-4172-7e85-ee6487f3b900/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/16d7982a-faae-4eaf-bb28-c209cfdaa300/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/ace412da-826b-44a0-122d-78c05c209700/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />{" "}
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/8f7e82d1-2a0f-4172-7e85-ee6487f3b900/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/16d7982a-faae-4eaf-bb28-c209cfdaa300/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />{" "}
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/8f7e82d1-2a0f-4172-7e85-ee6487f3b900/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/16d7982a-faae-4eaf-bb28-c209cfdaa300/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />{" "}
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/8f7e82d1-2a0f-4172-7e85-ee6487f3b900/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/16d7982a-faae-4eaf-bb28-c209cfdaa300/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/568bad9e-560a-4108-c3b8-70da3eb2d300/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/16d7982a-faae-4eaf-bb28-c209cfdaa300/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/ace412da-826b-44a0-122d-78c05c209700/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />{" "}
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/8f7e82d1-2a0f-4172-7e85-ee6487f3b900/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/16d7982a-faae-4eaf-bb28-c209cfdaa300/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/ace412da-826b-44a0-122d-78c05c209700/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />{" "}
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/8f7e82d1-2a0f-4172-7e85-ee6487f3b900/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/16d7982a-faae-4eaf-bb28-c209cfdaa300/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />{" "}
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/8f7e82d1-2a0f-4172-7e85-ee6487f3b900/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/16d7982a-faae-4eaf-bb28-c209cfdaa300/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />{" "}
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/5694257f-86fa-4dee-65fd-99181988fc00/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/8f7e82d1-2a0f-4172-7e85-ee6487f3b900/base" />
        <PostCard imgSrc="https://imagedelivery.net/0xmRpZUcpgGyk0D6fR-N6A/16d7982a-faae-4eaf-bb28-c209cfdaa300/base" />
      </div>
    </main>
  );
}
