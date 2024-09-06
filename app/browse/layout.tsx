import MainHeader from "@/components/layouts/desktop/MainHeader";

import type { Metadata } from "next";

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
  return (
    <>
      <MainHeader />

      {children}
    </>
  );
}
