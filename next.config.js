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
  async headers() {
    // allowedOrigins = ['https://www.world-recipes-made-yours.vercel.app/api/chat','https://world-recipes-made-yours.vercel.app/api/chat', 'https://world-recipes-made-yours.vercel.app', 'https://www.world-recipes-made-yours.vercel.app', 'https://world-recipes-made-yours.vercel.app/api/chat/', 'https://worldrecipesmade.com', 'https://www.worldrecipesmade.com', 'https://worldrecipesmade.com/api/chat', 'https://www.worldrecipesmade.com/api/chat'];

    // function handleRequest(request) {
    //   const requestOrigin = request.getHeader('Origin');
    //   if (allowedOrigins.includes(requestOrigin)) {
    //     response.setHeader('Access-Control-Allow-Origin', requestOrigin);
    //   } else {
    //     response.setHeader('Access-Control-Allow-Origin', 'None'); // or handle as an error
    //   }
    //   // ... rest of the handling
    // }

        // response.setHeader('Access-Control-Allow-Origin', 'None') // or handle as an error
    // ... rest of the handling

    return [
      {
        // matching all API routes
        source: "/api/chat/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.worldrecipesmade.com",
          },
          { key: "Access-Control-Allow-Methods", value: "OPTIONS, POST" },
          {
            key: "Access-Control-Allow-Headers",
            value: ['authorization', 'Content-Type', 'Access-Key'],
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
