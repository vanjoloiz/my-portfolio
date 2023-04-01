/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: "@svgr/webpack", options: { ref: true } }],
    });

    return config;
  },
};
