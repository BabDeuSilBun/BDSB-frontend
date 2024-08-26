/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['via.placeholder.com'],
  },
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL === '1',
  },
};

export default nextConfig;
