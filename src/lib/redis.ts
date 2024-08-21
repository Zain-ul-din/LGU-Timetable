import { Client, Entity, Schema, EntityData, Repository } from 'redis-om';

export interface IApiSchema {
  userId: string;
  createdAt: Date;
  requestMade: number;
  requestAllowed: number;
  dailyQuota: Date;
}

const redisClient = new Client();

async function connectClient() {
  if (!redisClient.isOpen()) {
    await redisClient.open(process.env.NEXT_PUBLIC_REDIS_URL);
  }
}

class ApiKey extends Entity {}
let schema = new Schema(
  ApiKey,
  {
    userId: { type: 'string' },
    createdAt: { type: 'date' },
    requestMade: { type: 'number' },
    requestAllowed: { type: 'number' },
    dailyQuota: { type: 'date' }
  },
  { dataStructure: 'JSON' }
);

let repository: Repository<ApiKey> | null = null;

function fetchRepo() {
  if (repository == null) repository = redisClient.fetchRepository(schema);
}

(async () => {
  await connectClient();
  fetchRepo();
})();

export async function createApiKey(data: EntityData) {
  if (repository == null) repository = redisClient.fetchRepository(schema);

  // !prevent fraud
  data.createdAt = new Date();
  data.dailyQuota = new Date();

  const entity = repository.createEntity(data);
  const apiKey = await repository.save(entity);
  repository.expire(apiKey, 24 * 60 * 60 * 30);

  return apiKey;
}

export async function getApisKeys(userId: string) {
  if (repository == null) repository = redisClient.fetchRepository(schema);

  await repository.createIndex();
  const keys = await repository.search().where('userId').equals(userId).return.all();
  return keys;
}

export async function deleteApiKey(id: string) {
  if (repository == null) repository = redisClient.fetchRepository(schema);

  await repository.createIndex();
  await repository.remove(id);
}

export async function authenticateClient(apiKey: string) {
  if (repository == null) repository = redisClient.fetchRepository(schema);

  const res = (await repository.fetch(apiKey)).toJSON();
  if (res['requestMade'] == undefined) return false;
  return res['requestAllowed'] > res['requestMade'];
}

export async function cutOffRequestsAllowed(apiKey: string) {
  if (repository == null) repository = redisClient.fetchRepository(schema);

  const res = await repository.fetch(apiKey);

  /**@ts-ignore */
  res.requestMade += 1;

  /**@ts-ignore */
  const lastReqDate = new Date(res.dailyQuota);
  const currDate = new Date();

  // time tolerance
  const diffTime = Math.abs(
    new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate()).getTime() -
      new Date(lastReqDate.getFullYear(), lastReqDate.getMonth(), lastReqDate.getDate()).getTime()
  );

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  /// 1 day quota reset
  if (diffDays >= 1) {
    /**@ts-ignore */
    res.dailyQuota = new Date();
    /**@ts-ignore */
    res.requestMade = 0;
  }

  await repository.save(res);
}
