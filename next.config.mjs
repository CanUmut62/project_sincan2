/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [64, 128, 256, 384],
    },
    async headers() {
        return [
            {
                source: "/uploads/:path*",
                headers: [
                    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
                ],
            },
        ];
    },
};

export default nextConfig;
