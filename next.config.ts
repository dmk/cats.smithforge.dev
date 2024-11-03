import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // images: {
  //   unoptimized: true,
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/, // Apply only if the SVG is imported in JS/TS files
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
