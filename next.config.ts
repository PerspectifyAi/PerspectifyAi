import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['randomuser.me'],
  },
  webpack: (config: { resolve: { alias: { [x: string]: string; }; }; }) => {
    config.resolve.alias['@'] = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      'src'
    );
    return config;
  },
};

export default nextConfig;
