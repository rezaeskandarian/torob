import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import MainFooter from "@/components/layouts/desktop/MainFooter";
import MainHeader from "@/components/layouts/desktop/MainHeader";
import notfound from "@/public/image-desktop/error_404.jpg";
import { headers } from "next/headers";
import { isMobile } from "@/lib/isMobile";

export const metadata: Metadata = {
  title: "صفحه یافت نشد خطای 404",
  description:
    "صفحه مورد نظر یافت نشد",
};

export default function NotFound() {
  const userAgent = headers().get("user-agent") || "";

  const mobileCheck = isMobile(userAgent);

  return (
    <>
      {mobileCheck === false && <MainHeader />}
      <div className="flex-grow flex flex-col justify-center items-center bg-light-gray space-y-5 py-8">
        <Image
          src={notfound}
          alt={"مسیر مورد نظر شما پیدا نشد"}
          width={400}
          height={200}
        />
        <Link href={"/"} className="">
          (خطای 404) متاسفانه صفحه مورد نظر شما یافت نشد.
        </Link>
        <Link className="bg-red-torob block rounded text-white px-4 py-2" href={"/"}>برگشت به خانه</Link>
      </div>
      {mobileCheck === false  && <MainFooter />}
      </>
  );
}
