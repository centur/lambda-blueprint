import { Error400 } from "./errors/error-400";

export const deepMerge = <T1 extends Record<string, any>, T2 extends Record<string, any>>(
  target: T1,
  source: T2,
): T1 => {
  const isObject = (object: any) => object && typeof object === "object" && object.constructor === Object;

  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (isObject(targetValue) && isObject(sourceValue)) {
      // @ts-ignore
      target[key] = deepMerge<T1, T2>(targetValue, sourceValue);
    } else {
      // @ts-ignore
      target[key] = sourceValue; // Arrays will always be overwritten here. Todo?
    }
  });
  return target;
};

export const assertNotNull = (obj: any): any => {
  if (obj == null) { throw new Error400(); }
  return obj;
};
