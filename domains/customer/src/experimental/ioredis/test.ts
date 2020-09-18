import * as Redis from "ioredis";
const cp = require("child_process");

(async () => {
  cp.execSync("docker run -d --name redis -p 6379:6379 redis");
  const redis = new Redis();

  const key = "foo";
  await redis.set(key, "bar");

  const value = await redis.get(key);
  console.debug(`Value of key ${key} is: ${value}`);

  redis.disconnect();
})();
