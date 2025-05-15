import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    //ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "nkengdev.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: 7 * 1024 * 1024, // 7mb in bytes
    },
  },
};

export default withNextIntl(nextConfig);
