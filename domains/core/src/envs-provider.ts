export const getEnvVar = <T>(key: string): T | undefined => {
  const envVar = process.env[key] as any;
  try {
    return JSON.parse(envVar) as T;
  } catch (e) {
    // In case 'envVar' cannot be parsed, we return as it is!
    return envVar as T;
  }
};

export const getEnvVarOrElseThrows = <T>(key: string): T => {
  throw new Error(); // Todo
};
