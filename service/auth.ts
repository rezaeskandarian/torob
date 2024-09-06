"use server";

import { getCookie, setJwtCookie } from "@/lib/cookies";

const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch(`${process.env.BASE_URL_API}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password }),
    }).then((res) => res.json());

    if (res) {
      setJwtCookie(res.jwt);
    }
    return res;
  } catch (err) {
    throw new Error("دریافت اطلاعات ناموفق بود");
  }
};

const registerUser = async (email: string, password: string , username : string) => {
  try {
    const res = await fetch(`${process.env.BASE_URL_API}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  email, password , username }),
    }).then((res) => res.json());

    if (res) {
      setJwtCookie(res.jwt);
    }
    return res;
  } catch (err) {
    throw new Error("دریافت اطلاعات ناموفق بود");
  }
};

const getMe = async () => {
  try {
    const token = getCookie("token");
    const res = await fetch(`${process.env.BASE_URL_API}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }).then((res) => res.json());
    if (res && res.id) {
      return res;
    }
  } catch (error) {
    throw new Error("دریافت اطلاعات ناموفق بود");
  }
};

export { loginUser, getMe , registerUser };
