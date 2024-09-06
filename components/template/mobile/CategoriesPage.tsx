"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface CategoryAttributes {
  name: string;
  mid_categories?: {
    data: Array<{ id: number; attributes: { name: string } }>;
  };
  sub_categories?: {
    data: Array<{ id: number; attributes: { name: string } }>;
  };
}

interface Category {
  id: number;
  attributes: CategoryAttributes;
}

const CategoriesPage = ({ category }: { category: Category[] }) => {
  const [mainSelected, setMainSelected] = useState<number | null>(null);
  const [midSelected, setMidSelected] = useState<Category | null>(null);
  const [subSelected, setSubSelected] = useState<Category | null>(null);

  const handleMainCategory = (id : number) => {
    setMainSelected(id);
    setMidSelected(category[id - 1]);
  };

  const handleMidCategory = (id: number) => {
    if (midSelected?.attributes.mid_categories?.data) {
      setSubSelected(midSelected.attributes.mid_categories.data[id - 1]);
      setMidSelected(null);
    }
  };
  console.log(subSelected);
  const renderMain = () => {
    return (
      <>
        <div className="sticky top-0 z-50 ">
          <p className="text-center border-b bg-white py-4 font-bold">
            همه دسته ها
          </p>
        </div>
        <div className="">
          {category.map((i: any) => (
            <div
              key={i.id}
              className="flex justify-between mr-5  ml-2  border-b py-[15px] "
              onClick={() => handleMainCategory(i.id)}
            >
              <p className="text-sm">{i.attributes.name}</p>
              <ChevronLeft size={20} />
            </div>
          ))}
        </div>
      </>
    );
  };
  console.log(midSelected);
  console.log(mainSelected);
  const handleBackMid = () => {
    setMainSelected(null);
  };
  const renderMid = () => {
    return (
      <>
        <div className="sticky top-0 z-50  w-full    border-b bg-white py-4 font-bold flex items-center">
        <ChevronRight size={18} className="mr-5 items-center absolute " onClick={handleBackMid} />
          
            
            <p className="text-center mx-auto  ">
              {midSelected?.attributes.name}
            </p>
       
        </div>
        <div className=" mr-5  ml-2 border-b py-[15px]">
          <Link href={"/"} className="font-bold text-sm">
            نمایش تمام کالاهای {midSelected?.attributes.name}
          </Link>
        </div>
        {midSelected?.attributes.mid_categories?.data.map((i: any) => (
          <>
            <div className="">
              <div
                key={i.id}
                className="flex justify-between mr-5  ml-2  border-b py-[15px] "
                onClick={() => handleMidCategory(i.id)}
              >
                <p className="text-sm">{i.attributes.name}</p>
              </div>
            </div>
          </>
        ))}
      </>
    );
  };

console.log(mainSelected);
console.log(midSelected)
console.log(subSelected)
const handleBackSub = () => {
  setSubSelected(null);
  if (mainSelected !== null) {
    handleMainCategory(mainSelected);
  }
};
  const renderSub = () => {
    return (
      <>
        <div className="sticky top-0 z-50  w-full    border-b bg-white py-4 font-bold flex items-center">
        <ChevronRight size={18} className="mr-5 items-center absolute " onClick={handleBackSub} />
          
            
            <p className="text-center mx-auto  ">
              {subSelected?.attributes.name}
            </p>
       
        </div>

        <div className=" mr-5  ml-2  border-b py-[15px]">
          <Link href={"/"} className="font-bold text-sm">
            نمایش تمام کالاهای {subSelected?.attributes.name}
          </Link>
        </div>
        {subSelected?.attributes.sub_categories?.data.map((i: any) => (
          <>
            <div className="">
              <div
                key={i.id}
                className="flex justify-between mr-5  ml-2  border-b py-[15px] "
                onClick={() => handleMidCategory(i.id)}
              >
                <p className="text-sm">{i.attributes.name}</p>
              </div>
            </div>
          </>
        ))}
      </>
    );
  };
  return (
    <div>
      {mainSelected === null && renderMain()}
      {mainSelected !== null && midSelected !== null && renderMid()}
      {subSelected !== null && renderSub()}
    </div>
  );
};

export default CategoriesPage;
