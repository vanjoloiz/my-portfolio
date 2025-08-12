/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const isRender = process.env.RENDER === "true";

module.exports = withBundleAnalyzer({
  swcMinify: true,
  reactStrictMode: false,
  experimental: isRender
    ? {
        swcLoader: true,
      }
    : {},
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: "@svgr/webpack", options: { ref: true } }],
    });

    if (isRender) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
      };
    }

    return config;
  },
});
