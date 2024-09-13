"use client";
import { LayoutGrid, Search, Tag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavBar = () => {
  const pathname = usePathname();

  return (
    <>
      <ul className="grid grid-cols-4  w-full fixed bottom-0 bg-white z-50 pt-2">
        <li
          className={`mx-auto ${
            pathname === "/" ? "text-red-torob" : "text-gray-600"
          }`}
        >
          <Link href={"/"}>
            <div className="mx-[25%]">
              <Search size={22} />
            </div>
            <div>
              <p className="text-[12px] font-bold my-1 ">جستجو</p>
            </div>
          </Link>
        </li>
        <li
          className={`mx-auto ${
            pathname === "/categories" ? "text-red-torob" : "text-gray-600"
          }`}
        >
          <Link href={"/categories"}>
            <div className="mx-[25%]">
              <LayoutGrid size={22} />
            </div>
            <div>
              <p className="text-[12px] font-bold my-1 ">دسته بندی ها</p>
            </div>
          </Link>
        </li>
        <li
          className={`mx-auto ${
            pathname === "/special-offers" ? "text-red-torob" : "text-gray-600"
          }`}
        >
          <Link href={"/special-offers"}>
            <div className="mx-[25%]">
              <Tag size={22} />
            </div>
            <div>
              <p className="text-[12px] font-bold my-1 ">پیشنهاد ویژه</p>
            </div>
          </Link>
        </li>
        <li
          className={`mx-auto ${
            pathname === "/user" ? "text-red-torob" : "text-gray-600"
          }`}
        >
          <Link href={"/user"}>
            <div className="mx-[25%]">
              <User size={22} />
            </div>
            <div>
              <p className="text-[12px] font-bold my-1 ">ترب من</p>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MobileNavBar;
