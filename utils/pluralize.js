export const pluralize = (singular, value) => {
  return value === 1 ? singular : `${singular}s`;
};
