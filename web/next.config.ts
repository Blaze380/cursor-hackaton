import type { NextConfig } from 'next';
import { getRemoteImagePatterns } from './src/shared/config/remote-images';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: [
    'kami-no-notebook.tail89b309.ts.net',
    'kami-no-notebook',
    'blaze.tail89b309.ts.net',
    'blaze',
  ],
  images: {
    remotePatterns: getRemoteImagePatterns(),
  },
};

export default nextConfig;
