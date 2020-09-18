import * as Redis from "ioredis";
const cp = require("child_process");

(async () => {
  cp.execSync("docker run -d --name redis -p 6379:6379 redis:6.0.8");
  const redis = new Redis();

  const key = "foo";
  await redis.set(key, "1");

  const value = await redis.get(key);
  console.debug(`Value of key ${key} is: ${value}`);

  redis.disconnect();

  await new Promise((resolve) => setTimeout(resolve, 1000));
  cp.execSync("docker rm -f redis");
})();
