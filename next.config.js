/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, os: false, crypto: "crypto" }

    return config
  },
}
