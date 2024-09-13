import MainHeader from "@/components/layouts/desktop/MainHeader";
import { isMobile } from "@/lib/isMobile";

import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "محصولات ",
  description:
    "مقایسه قیمت و جستجو بین صدها هزار محصول از فروشگاه‌های معتبر ایرانی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = headers().get("user-agent") || "";

  const mobileCheck = isMobile(userAgent);
  return (
    <>
      {mobileCheck === false && <MainHeader />}

      {children}
    </>
  );
}
