import path from 'path';
import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me'],
  },
  webpack: (config: WebpackConfig) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },

  async redirects() {
    return [
      {
        source: '/service-page/perspectify-waiting-list',
        destination: '/',
        permanent: true,
      },
      {
        source: '/perspectifyai-create-your-ai-financial-mentor',
        destination: '/#about-us',
        permanent: true,
      },
      {
        source: '/coming-soon',
        destination: '/',
        permanent: true,
      },
      {
        source: '/coming-soon/questions-answers',
        destination: '/#contact',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
