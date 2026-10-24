/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**" },
    ],
    formats: ["image/webp"],
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  // 跳过静态生成远程图片 fetch
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
