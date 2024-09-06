import BrowsePage from "@/components/template/desktop/BrowsePage";

import { getSingleMainCategory } from "@/service/getCategory";

const ProductBrowse = async ({
  params,
}: {
  params: {
    id: string;
    category_name: string;
  };
}) => {
  const nameCategory = await getSingleMainCategory(params.id);

  return (
    <BrowsePage
      main={nameCategory.data?.attributes.name || ""}
      mid={""}
      sub={""}
      paramsId={params.id}
    />
  );
};

export default ProductBrowse;
