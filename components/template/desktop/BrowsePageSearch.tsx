import FilterBrowse from "@/components/modules/desktop/FilterBrowse";
import ProductCard from "@/components/modules/desktop/ProductCard";



const BrowsePageSearch = ({QSearch} : {QSearch : string}) => {
  return (
    <>
      <div className="bg-medium-gray border-r w-full px-8">
        <FilterBrowse />

        <ProductCard paramsId={""} QSearch={QSearch} />
      </div>
    </>
  );
};

export default BrowsePageSearch;
