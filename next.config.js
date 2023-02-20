/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NODE_ENV: "development",
    VERCEL_URL: "trpc-app.vercel.app",
  },
};

module.exports = nextConfig;
