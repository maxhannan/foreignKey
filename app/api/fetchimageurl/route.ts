export async function GET(req: Request, response: Response) {
  const ImageLink = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_USER}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API}`,
      },
      next: {
        revalidate: 0,
      },
    }
  );
  console.log({ ImageLink });

  return ImageLink;
}
