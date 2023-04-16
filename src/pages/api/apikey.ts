import type { NextApiRequest, NextApiResponse } from 'next';
import { createApiKey, IApiSchema, getApisKeys } from '~/lib/redis';
import Joi from 'joi';
import NextCors from 'nextjs-cors';

const sanitizer = Joi.object<IApiSchema>({
   userId: Joi.string().required(),
   createdAt: Joi.date().required(),
   requestAllowed: Joi.number().required().max(200),
   requestMade: Joi.number().required(),
   dailyQuota: Joi.date().required()
}).required();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
   await NextCors(req, res, {
      methods: ['POST'],
      origin: '/',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
   });

   if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' });
      return;
   }

   if (sanitizer.validate(req.body).error) {
      res.status(406).send(sanitizer.validate(req.body).error);
      return;
   }

   const prevKeys = await getApisKeys(req.body.userId);
   if (prevKeys.length >= 3) {
      res.status(406).send('Limit Exceed');
      return;
   }

   try {
      res.status(201).send(await createApiKey(req.body));
   } catch (err) {
      res.status(400).send('bad request');
   }
}
