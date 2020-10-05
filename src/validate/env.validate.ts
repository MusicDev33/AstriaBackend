export const validateVitalEnv = (variable: string | undefined): string => {
  if (variable === undefined) {
    throw Error('Vital environment variable undefined!');
  }

  return variable;
}
