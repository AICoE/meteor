import type { NextApiRequest, NextApiResponse } from 'next';
import { getMeteor } from '../../../k8s';
import { HttpStatusCode } from '../../../constants';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  if (method === 'GET') {
    const meteor = await getMeteor(id as string);
    if (meteor) {
      res.status(HttpStatusCode.OK).json(meteor);
    } else {
      res.status(HttpStatusCode.NOT_FOUND).end('Not Found');
    }
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).setHeader('Allow', ['GET']);
    res.end(`Method ${method} Not Allowed`);
  }
};

export default handler;
