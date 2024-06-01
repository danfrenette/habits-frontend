/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/sidekiq/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_HOST}/sidekiq/:path*`,
      },
    ];
  },
};

export default nextConfig;
