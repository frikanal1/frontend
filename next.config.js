/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")()

module.exports = removeImports({
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, os: false, crypto: "crypto" }

    return config
  },
  publicRuntimeConfig: {
    FK_API: process.env.FK_API,
    FK_MEDIA: process.env.FK_MEDIA,
  },
  serverRuntimeConfig: {},
})
