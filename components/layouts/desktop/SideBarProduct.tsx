import Link from "next/link";
import SideBarAccordionCategories from "@/components/modules/desktop/SideBarAccordionCategories";
import SideBarAccordionPrice from "@/components/modules/desktop/SideBarAccordionPrice";
import SideBarAccordionSearch from "@/components/modules/desktop/SideBarAccordionSearch";

type CategoryData = {
  id: number;
  attributes: {
    name: string;
  };
};

type SideBarProductProps = {
  category?: {
    data: CategoryData[]; // Optional to handle undefined cases
  };
  headCategory?: string; // Optional to handle undefined cases
  link: string;
};

const SideBarProduct = ({
  category,
  headCategory,
  link,
}: SideBarProductProps) => {
  console.log(category);

  return (
    <div className="min-w-[390px] overflow-y-auto custom-overflow h-svh sticky top-0">
      {category && headCategory ? (
        <SideBarAccordionCategories
          category={category}
          headCategory={headCategory}
          link={link}
        />
      ) : (
        <div>آپدیت دسته بندی با موفقیت انجام نشد دوباره امتحان کنید</div> // Loading state while category data is being fetched
      )}
      <SideBarAccordionPrice /> {/* This renders immediately */}
      <SideBarAccordionSearch /> {/* This renders immediately */}
      {headCategory && (
        <div className="border-b py-5 pr-5">
          <Link
            href="/"
            className="text-red-torob font-bold cursor-pointer text-sm"
          >
            لیست قیمت {headCategory}
          </Link>
        </div>
      )}
      <div className="border-b py-5 pr-5">
        <h3 className="font-bold text-sm">دسته بندی های پر بازدید</h3>
        <div className="pr-5 py-1">
          <Link href="/" className="text-gray-700 text-sm cursor-pointer block py-1">
            قیمت گوشی شیائومی
          </Link>
          <Link href="/" className="text-gray-700 text-sm cursor-pointer block py-1">
            قیمت گوشی سامسونگ
          </Link>
          <Link href="/" className="text-gray-700 text-sm cursor-pointer block py-1">
            قیمت گوشی اپل
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBarProduct;