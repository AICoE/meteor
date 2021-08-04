import { NextApiResponse } from 'next';
import { register } from 'prom-client';
import { httpRequestsTotal } from '../../metrics';

// Metrics endpoint. Hits to `/metrics` are forwarded to this `/api/metrics` endpoint as well via next.config.js `rewrites`.
const metrics = async (_, res: NextApiResponse) => {
  res.setHeader('Content-type', register.contentType);
  res.end(await register.metrics());
  httpRequestsTotal.labels({ method: 'GET', statusCode: '200', path: '/metrics' }).inc();
};

export default metrics;
