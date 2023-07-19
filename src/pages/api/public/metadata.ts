import { authenticateClient, cutOffRequestsAllowed } from '~/lib/redis';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { metaDataCol } from '~/lib/firebase';
import { getDocs } from 'firebase/firestore';

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

    const metaData_docs = await getDocs(metaDataCol);
    const metaData = metaData_docs.docs
        .map((doc) => doc.data())
        .reduce((acc, curr) => {
            const [key, val] = Object.entries(curr)[0];
            return { ...acc, [key]: val };
        }, {});

    res.status(200).send(metaData);

    cutOffRequestsAllowed(req.query.apikey as string);
}
