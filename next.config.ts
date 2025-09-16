/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "klassart.com",
        pathname: "/web/uploads/image/**", // allow all under this path
      },
    ],
  },
  reactStrictMode: true,
  // ❌ removed invalid experimental key
};

module.exports = nextConfig;
