/** @type {import('next').NextConfig} */
const nextConfig = {
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
        ];
      },
};

module.exports = nextConfig;
