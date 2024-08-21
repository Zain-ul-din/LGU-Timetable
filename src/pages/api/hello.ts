// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { Client, Entity, Schema, Repository, EntityData } from 'redis-om';

const redisClient = new Client();

async function connectClient() {
  if (!redisClient.isOpen()) {
    await redisClient.open(process.env.NEXT_PUBLIC_REDIS_URL);
  }
}

interface IApiSchema {
  userEmail: string;
  createdAt: Date;
  requestMade: number;
  requestAllowed: number;
  dailyQuota: Date;
}

class ApiKey extends Entity {}

let schema = new Schema(
  ApiKey,
  {
    userEmail: { type: 'string' },
    createdAt: { type: 'date' },
    requestMade: { type: 'number' },
    requestAllowed: { type: 'number' },
    dailyQuota: { type: 'date' }
  },
  { dataStructure: 'JSON' }
);

async function createApiKey(data: EntityData) {
  await connectClient();

  const repository = redisClient.fetchRepository(schema);
  const entity = repository.createEntity(data);
  const apiKey = await repository.save(entity);

  return apiKey;
}

class Test extends Entity {}

let schemaTest = new Schema(Test, {
  test: { type: 'string' }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  res.send(await createApiKey(req.body));
}
