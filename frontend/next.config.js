// PatternFly 4 uses global CSS imports in its distribution files. Therefore,
// we need to transpile the modules before we can use them.
const withTM = require('next-transpile-modules')(['@patternfly/react-core', '@patternfly/react-styles', '@patternfly/react-log-viewer']);

module.exports = withTM({
  async rewrites() {
    // When running Next.js via Node.js (e.g. `dev` mode), proxy API requests
    // to the Go server.
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
});
