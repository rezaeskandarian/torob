import SideBarAccordionCategories from "@/components/modules/desktop/SideBarAccordionCategories";
import SideBarAccordionPrice from "@/components/modules/desktop/SideBarAccordionPrice";

const SideBarProductSearch = () => {
  return (
    <div className="min-w-[390px] overflow-y-auto custom-overflow h-svh sticky top-0">
      <SideBarAccordionCategories category={""} headCategory={""} link={""} />
      <SideBarAccordionPrice />
    </div>
  );
};

export default SideBarProductSearch;
