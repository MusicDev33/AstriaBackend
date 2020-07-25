export const getMongooseString = (jsType: string, additionalOptions: string): string => {
  if (!jsType.includes('[]')) {
    const newType = jsType[0].toUpperCase() + jsType.substring(1);
    return `{type: ${newType}, ${additionalOptions}}`;
  }

  if (jsType.includes('[]')) {
    const newType = jsType.split('[]')[0][0].toUpperCase() + jsType.split('[]')[0].substring(1);
    return `[{type: ${newType}, ${additionalOptions}}]`;
  }

  return 'throw Error;';
};
