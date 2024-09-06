import SideBarProduct from "@/components/layouts/desktop/SideBarProduct";
import BrowsePage from "@/components/template/desktop/BrowsePage";
import {
  getMidPopulateMain,
  getSingleMidCategory,
  getSingleSubCategory,
  getSubPopulateMid,
} from "@/service/getCategory";

type ProductBrowseProps = {
  params: {
    id: string;
    category_name: string;
  };
};

const ProductBrowse = async ({ params }: ProductBrowseProps) => {
  const mid = await getSubPopulateMid(params.id);
  const main = await getMidPopulateMain(
    mid.data.attributes.mid_category.data.id
  );

  return (
    <>
      <BrowsePage
        main={main.data.attributes.main_category.data.attributes.name}
        mid={main.data.attributes.name}
        sub={mid.data.attributes.name}
        paramsId={params.id}
      />
    </>
  );
};

export default ProductBrowse;
