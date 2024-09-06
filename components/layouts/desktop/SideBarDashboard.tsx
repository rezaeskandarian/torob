import { MainTitleSideBar } from "@/constants/sidebar";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";

const SideBarDashboard = () => {
  return (
    <div className=" pt-4 pr-9 border-l-2 w-60 text-slate-700 min-h-full">
      <div>
        {MainTitleSideBar.map((i) => (
          <>
            <div className="block items-center " key={i.text}>
              <Link className="flex pt-4 " href={i.href}>
                <div className="flex">
                  <div className="pl-2">{i.icon}</div>
                  {i.text}
                </div>
              </Link>
            </div>
          </>
        ))}
      </div>
      <div className="flex items-center cursor-pointer pt-4 border-b-2 w-44 pb-4">
        <MapPin />
        <div className="pr-2">
          <p className="text-sm">شهر من</p>
          <h3>اصفهان</h3>
        </div>
      </div>
      <div className="cursor-pointer pt-4 border-b-2 w-44 pb-4 text-sm font-thin">
        <div className=" flex flex-col space-y-4">
          <Link href={"/"}>لیست فروشگاه های ترب</Link>
          <Link href={"/"}> ثبت نام فروشگاه</Link>
        </div>
      </div>
      <div className="pt-4 text-sm">
        <details className="group">
          <summary className="flex  items-center font-medium cursor-pointer list-none">
            <span> پیگیری سفارش</span>
            <span className="transition group-open:rotate-180">
              <ChevronDown size={17} />
            </span>
          </summary>
          <div className="flex flex-col text-neutral-600 mt-3 group-open:animate-fadeIn space-y-4 pr-4">
            <Link href="/pages">سفارشات اخیر و ثبت پیگیری</Link>
            <Link href="/1">ادامه گفتگو با فروشگاه</Link>
            <Link href="/2">راهنما</Link>
          </div>
        </details>
      </div>
      <div className="pt-4 text-sm">
        <details className="group">
          <summary className="flex  items-center font-medium cursor-pointer list-none">
            <span> راهنمایی و شرایط</span>
            <span className="transition group-open:rotate-180">
              <ChevronDown size={17} />
            </span>
          </summary>
          <div className="flex flex-col text-neutral-600 mt-3 group-open:animate-fadeIn space-y-4 pr-4">
            <Link href="/pages"> راهنمای خرید امن </Link>
            <Link href="/1"> قوانین و مقررات </Link>
            <Link href="/2">حریم خصوصی</Link>
          </div>
        </details>
      </div>
      <div className="flex flex-col text-sm">
        <Link href={"/"} className="pt-4">
          پشتیبانی
        </Link>
        <Link href={"/"} className="pt-4 pb-4">
          درباره ترب
        </Link>
      </div>
    </div>
  );
};

export default SideBarDashboard;
