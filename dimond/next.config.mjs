/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/telemetry/:path*',
          destination: 'https://telemetry-api.dimo.zone/:path*', // Proxy to external API
        },
      ];
    },
  };
  
export default nextConfig;