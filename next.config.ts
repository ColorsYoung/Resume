import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
  },
  allowedDevOrigins: ['192.168.1.142'],
};

export default withNextIntl(nextConfig);
