import * as Redis from "ioredis";
const redis = new Redis();

(async () => {
  const key = "foo";
  await redis.set(key, "bar");

  const value = await redis.get(key);
  console.debug(`Value of key ${key} is: ${value}`);

  redis.disconnect();
})();
