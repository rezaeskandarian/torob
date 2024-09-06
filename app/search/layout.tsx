import MainHeader from "@/components/layouts/desktop/MainHeader";

import SideBarProductSearch from "@/components/layouts/desktop/SideBarProductSearch";
import { isMobile } from "@/lib/isMobile";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "جستجو در لیست  قیمت روز تمامی محصولات | ترب ",
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
  console.log(mobileCheck);
  return (
    <>
      {mobileCheck ? (
        <>
        { children }
        </>
      ) : (
        <>
          {" "}
          <MainHeader />
          <Suspense fallback={<div>...</div>}>
            <div className="flex">
              <SideBarProductSearch />
              {children}
            </div>
          </Suspense>
        </>
      )}
    </>
  );
}
