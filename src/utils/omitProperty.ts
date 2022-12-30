export const omitProperty = (key: string, obj: any): any => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};
