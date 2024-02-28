import { authenticateClient, cutOffRequestsAllowed } from '~/lib/redis';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import Joi from 'joi';

import { timeTableCol } from '~/lib/firebase';
import { getDoc, doc } from 'firebase/firestore';

interface ITimetableQuery {
  semester: string;
  program: string;
  section: string;
}

const sanitizer = Joi.object<ITimetableQuery>({
  semester: Joi.string().required(),
  program: Joi.string().required(),
  section: Joi.string().required()
}).required();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.query.apikey == undefined) {
    res.status(400).send('api key required');
    return;
  }

  const isAuthenticated = await authenticateClient(req.query.apikey as string);

  if (!isAuthenticated) {
    res.status(401).send('Unauthorized | limit exceed. check your dashboard for more');
    return;
  }

  if (sanitizer.validate(req.body).error) {
    res.status(406).send(sanitizer.validate(req.body).error);
    return;
  }

  const query = req.body as ITimetableQuery;

  const timetableDoc = doc(
    timeTableCol,
    `${query.semester.replace('/', '-')} ${query.program} ${query.section}`
  );

  const timetableDocSnap = await getDoc(timetableDoc);

  if (!timetableDocSnap.exists()) {
    res.status(404).send('not found');
  } else {
    res.status(200).send(timetableDocSnap.data());
  }

  cutOffRequestsAllowed(req.query.apikey as string);
}
