import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        port: "",
        pathname: "/0xmRpZUcpgGyk0D6fR-N6A/**",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
