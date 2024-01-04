/** @type {import('next').NextConfig} */
const withVideos = require('next-videos')
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // You can leave the port and pathname properties empty to allow all paths from this domain
        port: "",
        pathname: "/**",
      },
      // ... any other remote patterns you need
    ],
  },

};

module.exports = nextConfig;
