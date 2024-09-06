import Breadcrump from "@/components/modules/desktop/Breadcrump";
import FilterBrowse from "@/components/modules/desktop/FilterBrowse";
import ProductCard from "@/components/modules/desktop/ProductCard";


interface BrowsePageProps {
  main: string;
  mid: string;
  sub: string;
  paramsId: string;
}

const BrowsePage = async ({ main, mid, sub, paramsId }: BrowsePageProps) => {
  return (
    <div className="bg-medium-gray border-r w-full px-8">
      <div>
        <Breadcrump main={main} mid={mid} sub={sub} idSub={""} />
      </div>
      <h2 className="py-4 font-bold text-2xl border-t">
        {sub ? sub : mid ? mid : main}
      </h2>
      <FilterBrowse />

      <ProductCard paramsId={paramsId} QSearch={""} />
    </div>
  );
};

export default BrowsePage;
