import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    const apiHost = process.env.API_HOST || 'http://localhost:3001';
    return [
      { source: '/api/:path*', destination: `${apiHost}/:path*` },
    ];
  },
};

export default nextConfig;
