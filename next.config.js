/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // Disable static exports for server rendering
  images: {
    // unoptimized: true, // Only needed for static export
  },
  // trailingSlash: true, // Only needed for static export
  // Remove assetPrefix and basePath as they're causing issues
  distDir: '.next', // Default for server rendering
  // Add headers for better caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig