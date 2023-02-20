/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    VERCEL_URL: "trpc-app.vercel.app",
  },
};

module.exports = nextConfig;
