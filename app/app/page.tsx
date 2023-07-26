import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Editor from "@/components/Editor";
import axios from "axios";
export const dynamic = "force-dynamic";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log({ session });

  return <main>{session?.user && <Editor />}</main>;
}
