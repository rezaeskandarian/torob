import FilterBrowse from "@/components/modules/desktop/FilterBrowse";
import ProductCard from "@/components/modules/desktop/ProductCard";
import { isMobile } from "@/lib/isMobile";
import { headers } from "next/headers";



const BrowsePageSearch = ({QSearch} : {QSearch : string}) => {
  const userAgent = headers().get("user-agent") || "";

  const mobileCheck = isMobile(userAgent);
  return (
    <>
      <div className="bg-medium-gray border-r w-full px-8">
        <FilterBrowse />

        <ProductCard paramsId={""} QSearch={QSearch} mobile={mobileCheck} />
      </div>
    </>
  );
};

export default BrowsePageSearch;
