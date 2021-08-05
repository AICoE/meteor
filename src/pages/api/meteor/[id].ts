import type { NextApiRequest, NextApiResponse } from 'next';
import { getMeteor } from '../../../k8s';
import { HttpStatusCode } from '../../../constants';
import { httpRequestsTotal } from '../../../metrics';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  if (method === 'GET') {
    const meteor = await getMeteor(id as string);
    if (meteor) {
      res.status(HttpStatusCode.OK).json(meteor);
      httpRequestsTotal.labels({ method, statusCode: HttpStatusCode.OK, path: `/api/meteor/${id}` }).inc();
    } else {
      res.status(HttpStatusCode.NOT_FOUND).end('Not Found');
      httpRequestsTotal.labels({ method, statusCode: HttpStatusCode.NOT_FOUND, path: `/api/meteor/${id}` }).inc();
    }
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).setHeader('Allow', ['GET']);
    res.end(`Method ${method} Not Allowed`);
    httpRequestsTotal.labels({ method, statusCode: HttpStatusCode.METHOD_NOT_ALLOWED, path: `/api/meteor/${id}` }).inc();
  }
};

export default handler;
