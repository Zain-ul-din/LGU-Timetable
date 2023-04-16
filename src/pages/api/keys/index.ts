import type { NextApiRequest, NextApiResponse } from 'next';

import { getApisKeys, deleteApiKey } from '~/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
   if (req.query.q == undefined) {
      res.send('error: set q= <your query>');
      return;
   }

   if (req.method == 'DELETE') {
      deleteApiKey(req.query.q as string);
      res.status(200).send('Api key has been deleted');
      return;
   }

   try {
      var keys = await getApisKeys(req.query.q as string);
   } catch (err) {
      res.status(404).send([]);
      return;
   }

   res.status(200).send(keys);
}
