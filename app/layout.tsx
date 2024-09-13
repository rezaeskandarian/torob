import type { Metadata } from "next";

import "./globals.css";
import { iranYekan } from "@/constants/font";
import Providers from "@/redux/provider";
import OfflineNotification from "@/components/modules/desktop/OfflineNotification";

import NextLoader from "nextjs-rtl-loader";
import { headers } from "next/headers";
import { isMobile } from "@/lib/isMobile";
import MobileNavBar from "@/components/layouts/mobile/MobileNavBar";


const font = iranYekan;

export const metadata: Metadata = {
  title: "ترب | بهترین قیمت بازار",
  description:
    "مقایسه قیمت و جستجو بین صدها هزار محصول از فروشگاه‌های معتبر ایرانی",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
};

export const viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  shrinkToFit: "no",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userAgent = headers().get("user-agent") || "";

  const mobileCheck = isMobile(userAgent);

  return (
    <html lang="fa" dir="rtl">
      <body className={font.className}>
      {mobileCheck && <MobileNavBar />}
        <Providers>
        
          <NextLoader
            color="#BF0F22"
            height="3px"
            speed={300}
            easing="ease"
            showSpinner={false}
          />

          {children}
          
           
         
          <OfflineNotification />
        </Providers>
      </body>
    </html>
  );
}
