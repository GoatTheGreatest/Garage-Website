/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Unsplash/Pixabay perform image CDN resizing; direct delivery avoids proxy bottlenecks.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pixabay.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
};

export default nextConfig;
