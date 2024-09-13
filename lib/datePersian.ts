
import JalaliDate from 'jalali-date';
import { e2p } from './numbers';

function getFormattedJalaliDate(date: string): string {
  const now = new JalaliDate();
  const inputDate = new JalaliDate(new Date(date));

  const yearsDifference = now.getFullYear() - inputDate.getFullYear();
  const monthsDifference = now.getMonth() - inputDate.getMonth();
  const daysDifference = now.getDate() - inputDate.getDate();

  if (yearsDifference > 0) {
    return `${e2p(yearsDifference) } سال  `;
  } else if (monthsDifference > 0) {
    return `${e2p(monthsDifference)} ماه  `;
  } else {
    return `${e2p(daysDifference)} روز `;
  }
}

export { getFormattedJalaliDate };