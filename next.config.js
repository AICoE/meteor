// PatternFly 4 uses global CSS imports in its distribution files. Therefore,
// we need to transpile the modules before we can use them.
const withTM = require('next-transpile-modules')(['@patternfly/react-core', '@patternfly/react-styles', '@patternfly/react-log-viewer']);

// Default metrics needs to be registered only once and at the startup
const client = require('prom-client');
client.collectDefaultMetrics();

module.exports = withTM({
  // Handle `/metrics` calls as if it is a call to `/api/metrics`
  rewrites: async () => [{ source: '/metrics', destination: '/api/metrics' }],
});
