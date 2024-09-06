declare module "jalali-date" {
  export default class JalaliDate {
    constructor(date?: Date | string);
    getFullYear(): number;
    getMonth(): number;
    getDate(): number;
  }
}
