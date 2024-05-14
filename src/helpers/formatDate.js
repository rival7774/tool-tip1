import { formatNumberDate } from '@/helpers/formatNumberDate';

export const formatDate = (date) => {
  const newDate = new Date(date);

  return {
    year: newDate.getFullYear(),
    month: formatNumberDate(newDate.getMonth() + 1),
    date: formatNumberDate(newDate.getDate()),
    hour: formatNumberDate(newDate.getHours()),
    minute: formatNumberDate(newDate.getMinutes()),
    second: formatNumberDate(newDate.getSeconds())
  };
};
