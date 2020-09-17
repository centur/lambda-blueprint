export const getEnvVar = <T>(key: string): T | undefined => {
  const  value = process.env[key] as any;
  try {
    return JSON.parse(value) as T; // Will produce the correct type.
  } catch (e) {
    return value as T;
  }
};

export const getEnvVarOrElseThrows = <T>(key: string): T => {
  const  value = getEnvVar(key);
  if (!value) { throw new Error(`There is no value for key: ${key}`); }
  return value as T;
};
