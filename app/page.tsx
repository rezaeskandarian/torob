
import { headers } from "next/headers";

import { isMobile } from "@/lib/isMobile";

import HomePage from "@/components/template/desktop/HomePage";
import HomePageMobile from "@/components/template/mobile/HomePageMobile";

export default async function Home() {
  const userAgent = headers().get("user-agent") || "";

  const mobileCheck = isMobile(userAgent);

  return mobileCheck ? <HomePageMobile /> : <HomePage />;
}
