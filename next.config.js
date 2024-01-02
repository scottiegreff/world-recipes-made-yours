/** @type {import('next').NextConfig} */
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
  
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/chat/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "https://world-recipes-made-yours.vercel.app",
  //         },
  //         { key: "Access-Control-Allow-Methods", value: "OPTIONS, POST" },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value: "authorization, Content-Type, Access-Key",
  //         },
  //       ],
  //     },
  //   ];
  // },

};

module.exports = nextConfig;

const withVideos = require('next-videos')

module.exports = withVideos()
