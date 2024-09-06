import MainFooter from "@/components/layouts/desktop/MainFooter";
import MainHeader from "@/components/layouts/desktop/MainHeader";
import SideBarDashboard from "@/components/layouts/desktop/SideBarDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "داشبورد ",
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
      <div className="flex">
        <SideBarDashboard />
        {children}
      </div>
      <MainFooter />
    </>
  );
}
