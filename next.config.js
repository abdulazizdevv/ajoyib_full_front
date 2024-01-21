/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compress: true,
  images: {
    domains: ["localhost", "system.ajoyib-fastfood.uz"],
  },
};

module.exports = nextConfig;
