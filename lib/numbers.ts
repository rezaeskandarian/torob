const e2p = (s: any) =>
  s?.toString().replace(/\d/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

const p2e = (s: any) =>
  s?.toString().replace(/[۰-۹]/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

const sp = (number: number) => {
  const seperatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber?.join("/");
  return e2p(joinedNumber);
};

const re = (number: string): string => {
  return number.replace(/\//g, "");
};

export { e2p, p2e, sp , re };
