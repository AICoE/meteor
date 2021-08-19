import type { NextApiRequest, NextApiResponse } from 'next';
import { getConsoleUrl } from '../../k8s';
import { HttpStatusCode } from '../../constants';
import { httpRequestsTotal } from '../../metrics';

var consoleUrl = '';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method === 'GET') {
    if (!consoleUrl) {
      consoleUrl = await getConsoleUrl();
    }
    res.status(HttpStatusCode.OK).json({ consoleUrl });
    httpRequestsTotal.labels({ method, statusCode: HttpStatusCode.OK, path: '/api/console' }).inc();
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).setHeader('Allow', ['GET']);
    res.end(`Method ${method} Not Allowed`);
    httpRequestsTotal.labels({ method, statusCode: HttpStatusCode.METHOD_NOT_ALLOWED, path: '/api/console' }).inc();
  }
};

export default handler;
