"use server";

import { cookies } from "next/headers";

const setJwtCookie = (jwt: string) => {
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("token", jwt, {
    httpOnly: true,
    maxAge: oneDay,
  });
};

const getCookie = (cookieName: string) => {
  const res = cookies().get(`${cookieName}`);
  return res;
};

const deleteCookie = (cookieName: string) => {
  cookies().delete(`${cookieName}`);
};

export { setJwtCookie, getCookie, deleteCookie };
