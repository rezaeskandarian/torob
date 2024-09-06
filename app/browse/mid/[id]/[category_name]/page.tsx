import SideBarProduct from "@/components/layouts/desktop/SideBarProduct";
import BrowsePage from "@/components/template/desktop/BrowsePage";
import {
  getMidPopulateMain,
  getSingleMidCategory,
} from "@/service/getCategory";



type ProductBrowseProps = {
  params: {
    id: string;
    category_name: string;
  };
};

const ProductBrowse = async ({ params }: ProductBrowseProps) => {
  const nameCategory = await getSingleMidCategory(params.id);

  const main = await getMidPopulateMain(nameCategory.data.id);


  return (
    <>
    
       
        <BrowsePage
          main={main.data.attributes.main_category.data.attributes.name}
          mid={nameCategory.data.attributes.name}
          sub={""}
          paramsId={params.id}
        />
   
    </>
  );
};

export default ProductBrowse;


