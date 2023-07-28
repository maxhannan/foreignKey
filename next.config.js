/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
