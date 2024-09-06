import SideBarProduct from "@/components/layouts/desktop/SideBarProduct";
import {
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

export async function generateMetadata({ params }: ProductBrowseProps) {
  const nameCategory = await getSingleSubCategory(params.id);

  if (!nameCategory?.data || !nameCategory?.data?.attributes) {
    return {
      title: "دسته بندی پیدا نشد دوباره امتحان کنید",
    };
  }

  let today = new Date().toLocaleDateString("fa-IR");

  return {
    title: ` قیمت ${nameCategory?.data?.attributes?.name} امروز , ${today} | ترب`,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    id: string;
    category_name: string;
  };
}>) {
  console.log(params);

  const mid = await getSubPopulateMid(params.id);

  const midCategory = await getSingleMidCategory(
    mid.data.attributes.mid_category.data.id
  );
  const sideBarCategory = midCategory.data.attributes.sub_categories;
  const headSideBarCategory = midCategory.data.attributes.name;
  return (
    <>
      <div className="flex">
        <SideBarProduct
          category={sideBarCategory}
          headCategory={headSideBarCategory}
          link={"sub"}
        />
        {children}
      </div>
    </>
  );
}
