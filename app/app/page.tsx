import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Editor from "@/components/Editor";
import axios from "axios";
export const dynamic = "force-dynamic";
export default function Home() {
  const session = getServerSession(authOptions);
  console.log({ session });

  return <main></main>;
}
