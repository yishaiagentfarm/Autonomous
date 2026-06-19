/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Autonomous",
  assetPrefix: "/Autonomous/",
  images: { unoptimized: true },
};
export default nextConfig;
