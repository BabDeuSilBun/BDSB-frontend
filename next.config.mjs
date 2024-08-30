/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'via.placeholder.com',
      'zerobase-s3.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
