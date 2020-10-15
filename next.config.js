module.exports = {
  async redirects() {
    return [
      {
        source: '/web-frontpage',
        destination: '/',
        permanent: true,
      },
    ]
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
