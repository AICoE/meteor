// PatternFly 4 uses global CSS imports in its distribution files. Therefore,
// we need to transpile the modules before we can use them.
const withTM = require('next-transpile-modules')(['@patternfly/react-core', '@patternfly/react-styles']);

// Default metrics needs to be registered only once and at the startup
const client = require('prom-client');
client.collectDefaultMetrics({ prefix: 'meteor_shower_' });

module.exports = withTM({
  // Handle `/metrics` calls as if it is a call to `/api/metrics`
  rewrites: async () => [{ source: '/metrics', destination: '/api/metrics' }],
  // Exposed to both client and server
  publicRuntimeConfig: {
    github: 'https://github.com/AICoE?q=meteor',
    slack: 'https://join.slack.com/t/operatefirst/shared_invite/zt-o2gn4wn8-O39g7sthTAuPCvaCNRnLww',
  },
});
