/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */
const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withContentlayer(nextConfig);