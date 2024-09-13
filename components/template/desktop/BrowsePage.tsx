import Breadcrump from "@/components/modules/desktop/Breadcrump";
import FilterBrowse from "@/components/modules/desktop/FilterBrowse";
import ProductCard from "@/components/modules/desktop/ProductCard";
import FilterBrowseMobile from "@/components/modules/mobile/FilterBrowseMobile";
import TopNavBrowse from "@/components/modules/mobile/TopNavBrowse";
import { isMobile } from "@/lib/isMobile";
import { headers } from "next/headers";

interface BrowsePageProps {
  main: string;
  mid: string;
  sub: string;
  paramsId: string;
}

const BrowsePage = async ({ main, mid, sub, paramsId }: BrowsePageProps) => {
  const userAgent = headers().get("user-agent") || "";

  const mobileCheck = isMobile(userAgent);

  return (
    <div className={`bg-medium-gray border-r w-full ${mobileCheck ? null : "px-8"} `}>
      <div>
        {mobileCheck ? null : (
          <Breadcrump main={main} mid={mid} sub={sub} idSub={""} />
        )}
      </div>
      {mobileCheck ? (
        <TopNavBrowse title={sub ? sub : mid ? mid : main} />
      ) : (
        <h2 className="py-4 font-bold text-2xl border-t">
          {sub ? sub : mid ? mid : main}
        </h2>
      )}

      {mobileCheck ? <FilterBrowseMobile mobile={mobileCheck} /> : <FilterBrowse />}

      <ProductCard paramsId={paramsId} QSearch={""} mobile={mobileCheck} />
    </div>
  );
};

export default BrowsePage;
