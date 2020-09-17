export const getEnvVar = <T>(key: string): T | undefined => {
  const envVar = process.env[key] as any;
  try {
    return JSON.parse(envVar) as T; // It will produce the correct type.
  } catch (e) {
    return envVar as T;
  }
};

export const getEnvVarOrElseThrows = <T>(key: string): T => {
  const envVar = getEnvVar(key);
  if (!envVar) { throw new Error(`There is no value for key: ${key}`); }
  return envVar as T;
};
