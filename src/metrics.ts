import { collectDefaultMetrics, Counter, register } from 'prom-client';

// Prometheus client doesn't like how NextJS re-imports and re-evaluates all changes with hot reloading.
// Hence to support hot reloading we need to flush existing metrics registry in case a page containing a metric was changed.
if (process.env.NODE_ENV == 'development') {
  register.clear();
  collectDefaultMetrics();
}

// Arbitrary metrics counting page hits
export const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total requests received',
  labelNames: ['method', 'statusCode', 'path'],
});

export default {
  httpRequestsTotal,
};
