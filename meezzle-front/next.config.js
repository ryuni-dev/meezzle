/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: 'public',
});

const nextConfig = withPWA({
    reactStrictMode: false,
    swcMinify: true,

    async redirects() {
        return [
          {
            source: '/login',
            destination: '/',
            permanent: false,
          },
          {
            source: '/event/create',
            destination: '/',
            permanent: false,
          },
          {
            source: '/event/:eid/congratulations',
            destination: '/event/:eid/info',
            permanent: false,
          },
          {
            source: '/event/:eid/revise',
            destination: '/event/:eid/info',
            permanent: false,
          },
          {
            source: '/event/:eid/vote',
            destination: '/event/:eid/info',
            permanent: false,
          },
          {
            source: '/event/:eid/delete',
            destination: '/',
            permanent: false,
          },
        ];
      },
});

module.exports = nextConfig;