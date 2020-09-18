import * as Redis from "ioredis";

(async () => {
  const redis = new Redis(6379, "localhost");

  const key = "foo";
  await redis.set(key, "bar");

  const val = await redis.get(key);
  console.debug(`Val of key ${key} is: ${val}`);

  redis.disconnect();
})();
