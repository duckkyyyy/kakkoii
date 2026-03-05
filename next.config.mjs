import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
  turbopack: {},
  webpack(config) {
    const oneOf = config.module.rules.find((r) => typeof r.oneOf === 'object')?.oneOf;
    if (!oneOf) return config;
    oneOf.forEach((rule) => {
      if (!Array.isArray(rule.use)) return;
      rule.use.forEach((loader) => {
        if (loader.loader?.includes('css-loader') && loader.options?.modules) {
          loader.options.modules.getLocalIdent = (context, _, exportName) => {
            const rel = path.relative(__dirname, context.resourcePath);
            const name = rel.replace(/\.module\.css$/, '').replace(/[/\\]/g, '-');
            return `${name}__${exportName}`;
          };
        }
      });
    });
    return config;
  },
};

export default nextConfig;
