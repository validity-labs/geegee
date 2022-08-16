// eslint-disable-next-line @typescript-eslint/no-var-requires
// const path = require('path');
const { i18n } = require('./next-i18next.config');

/**
 * @type {import('./src/typings/app').NextAppConfig}
 */
module.exports = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    matomoSiteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
    matomoBaseUrl: process.env.NEXT_PUBLIC_MATOMO_BASE_URL,
    matomoTrackerUrl: process.env.NEXT_PUBLIC_MATOMO_TRACKER_URL,
    matomoSrcUrl: process.env.NEXT_PUBLIC_MATOMO_SRC_URL,
    auth0BaseUrl: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL
  }
  // async rewrites() {
  //   return [
  //     {
  //       source: '/insights/:path*',
  //       destination: '/blog/:path*',
  //     }
  //   ]
  // },
  // webpack: (config, options) => {
  //   config.plugins.push(
  //     new options.webpack.DefinePlugin({
  //       'process.env.NEXT_PUBLIC_DYNAMIC_CMS_ENDPOINT': JSON.stringify(options.isServer ? process.env.NEXT_PRIVATE_CMS_ENDPOINT : process.env.PUBLIC_CMS_ENDPOINT),
  //     })
  //   )
  //   return config
  // },
};
