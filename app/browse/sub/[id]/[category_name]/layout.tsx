import SideBarProduct from "@/components/layouts/desktop/SideBarProduct";
import { isMobile } from "@/lib/isMobile";
import {
  getSingleMidCategory,
  getSingleSubCategory,
  getSubPopulateMid,
} from "@/service/getCategory";
import { headers } from "next/headers";

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

  const userAgent = headers().get("user-agent") || "";

  const mobileCheck = isMobile(userAgent);

  return (
    <>
      <div className="flex">
        {mobileCheck === false && (
          <SideBarProduct
            category={sideBarCategory}
            headCategory={headSideBarCategory}
            link={"sub"}
          />
        )}

        {children}
      </div>
    </>
  );
}
