
import JalaliDate from 'jalali-date';
import { e2p } from './numbers';

function getFormattedJalaliDate(date: string): string {
  const now = new JalaliDate();
  const inputDate = new JalaliDate(new Date(date));

  const yearsDifference = now.getFullYear() - inputDate.getFullYear();
  const monthsDifference = now.getMonth() - inputDate.getMonth();
  const daysDifference = now.getDate() - inputDate.getDate();

  if (yearsDifference > 0) {
    return `${e2p(yearsDifference) } سال و ${e2p(Math.abs(monthsDifference))} ماه پیش`;
  } else if (monthsDifference > 0) {
    return `${e2p(monthsDifference)} ماه و ${e2p(Math.abs(daysDifference))} روز پیش`;
  } else {
    return `${e2p(daysDifference)} روز پیش`;
  }
}

export { getFormattedJalaliDate };