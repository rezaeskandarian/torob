import SideBarProduct from "@/components/layouts/desktop/SideBarProduct";
import { getSingleMidCategory } from "@/service/getCategory";

type ProductBrowseProps = {
  params: {
    id: string;
    category_name: string;
  };
};

export async function generateMetadata({ params }: ProductBrowseProps) {
    const nameCategory = await getSingleMidCategory(params.id);
  
    if (!nameCategory?.data || !nameCategory?.data?.attributes) {
      return {
        title: "دسته بندی پیدا نشد دوباره امتحان کنید",
      };
    }
  
    let today = new Date().toLocaleDateString("fa-IR");
  
    return {
      title: ` لیست قیمت ${nameCategory.data.attributes.name} , ${today} | ترب`,
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
  const nameCategory = await getSingleMidCategory(params.id);
  const sideBarCategory = nameCategory.data.attributes.sub_categories;
  const headSideBarCategory = nameCategory.data.attributes.name;
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
