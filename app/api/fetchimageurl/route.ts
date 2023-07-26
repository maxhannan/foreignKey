import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const ImageLink = await axios.post(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_USER}/images/v2/direct_upload`,
    null,
    {
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API}`,
      },
    }
  );

  return new NextResponse(JSON.stringify(ImageLink.data));
}
