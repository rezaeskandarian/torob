"use client";

import {
  fetchIdCategory,
  setId,
  setPage,
} from "@/redux/features/product/productSlice";
import { AppDispatch } from "@/redux/store";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type BreadcrumpProps = {
  sub: string | null;
  mid: string | null;
  main: string | null;
  idSub: string | number | null;
};

const Breadcrump = ({ sub, mid, main, idSub }: BreadcrumpProps) => {
  const selector = useSelector((state: any) => state.products.categoryId);
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/p")) {
      dispatch(setPage("product"));
      dispatch(setId({ key: "subId", value: idSub }));
      dispatch(fetchIdCategory());
    }
  }, [pathname, dispatch, idSub]);

  return (
    <div className="flex items-center py-4">
      <Link href={"/"} className="text-xs px-1" prefetch>
        ترب
      </Link>
      {main && (
        <Link
          href={`/browse/main/${selector.mainId}`}
          className="text-gray-500 text-xs   flex items-center"
          prefetch
        >
          <ChevronLeft size={12} className="" />
          <div className="px-2">{main}</div>
        </Link>
      )}
      {mid && (
        <Link
          href={`/browse/mid/${selector.midId}`}
          className="text-gray-500 text-xs   flex items-center "
          prefetch
        >
          <ChevronLeft size={12} className="" />
          <div className="px-2">{mid}</div>
        </Link>
      )}
      {sub && (
        <Link
          href={`/browse/sub/${selector.subId}`}
          className="text-gray-500 text-xs   flex items-center "
          prefetch
        >
          <ChevronLeft size={12} className="" />
          <div className="px-2">{sub}</div>
        </Link>
      )}
    </div>
  );
};

export default Breadcrump;
