import { getSingleMainCategory } from "@/service/getCategory";
import { lazy, Suspense } from "react";
const SideBarProduct = lazy(
  () => import("@/components/layouts/desktop/SideBarProduct")
);

type ProductBrowseProps = {
  params: {
    id: string;
    category_name: string;
  };
};

export async function generateMetadata({ params }: ProductBrowseProps) {
  const nameCategory = await getSingleMainCategory(params.id);

  if (!nameCategory?.data || !nameCategory?.data?.attributes) {
    return {
      title: "دسته بندی پیدا نشد دوباره امتحان کنید",
    };
  }

  let today = new Date().toLocaleDateString("fa-IR");

  return {
    title: `لیست قیمت ${nameCategory.data.attributes.name}, ${today} | ترب`,
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
  const nameCategory = await getSingleMainCategory(params.id);
  const sideBarCategory = nameCategory.data?.attributes.mid_categories || [];
  const headSideBarCategory = nameCategory.data?.attributes.name || "";
  return (
    <div className="flex">
      
        <SideBarProduct
          category={sideBarCategory}
          headCategory={headSideBarCategory}
          link={"mid"}
        />
      

      <Suspense fallback={<div>Loading content...</div>}>{children}</Suspense>
    </div>
  );
}
