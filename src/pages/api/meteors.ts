import type { NextApiRequest, NextApiResponse } from 'next';
import { listMeteors, createMeteor } from '../../k8s';
import { HttpStatusCode } from '../../constants';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;
  if (method === 'POST') {
    const meteor = await createMeteor(body);
    res.status(HttpStatusCode.CREATED).setHeader('Location', `/api/meteor/${meteor.metadata.name}`);
    res.json(meteor);
  } else if (method === 'GET') {
    const meteors = await listMeteors();
    res.status(HttpStatusCode.OK).json(meteors.map((m: any) => m.metadata.name));
  } else {
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).setHeader('Allow', ['GET', 'POST']);
    res.end(`Method ${method} Not Allowed`);
  }
};

export default handler;
