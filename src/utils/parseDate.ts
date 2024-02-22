export const parseDate = (date: string) => {
  return date.split(' ')[1].slice(0, 5);
};
