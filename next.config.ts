import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/odoratus-storefront',
  assetPrefix: '/odoratus-storefront/',
};

export default nextConfig;
