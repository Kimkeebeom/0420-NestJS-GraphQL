export const getDBDateStringByDate = (date: Date) => {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}${String(newDate.getMonth() + 1).padStart(
    2,
    '0',
  )}${String(newDate.getDate()).padStart(2, '0')}`;
};
