"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type CategoryData = {
  id: number;
  attributes: {
    name: string;
  };
};

type SideBarAccordionCategoriesProps = {
  category:
    | {
        data: CategoryData[];
      }
    | string;
  headCategory: string;
  link: string;
};

const SideBarAccordionCategories = ({
  category,
  headCategory,
  link,
}: SideBarAccordionCategoriesProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState<boolean>(false);
  const { page , categoryId } = useSelector((state: any) => state.products);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleShow = () => {
    setShowAll(!showAll);
  };
 

  useEffect(() => {
    if(page === "sub") {
      setShowAll(true);
    }
  } , [page])
 
  const displayedItems =
    typeof category === "object" && "data" in category
      ? showAll
        ? category.data
        : category.data.slice(0, 5)
      : [];

  return (
    <div className="accordion">
      <div className="accordion-item border-b">
        <button
          className="accordion-header flex items-center bg-white p-4 w-full text-sm font-bold"
          onClick={() => toggleAccordion(0)}
        >
          <div className="pl-2">
            {activeIndex === 0 ? (
              <ChevronUp size={15} />
            ) : (
              <ChevronDown size={15} />
            )}
          </div>
          {page === "search" ? (
            <p className="font-bold">دسته های پیشنهادی</p>
          ) : (
            <p className="font-bold">دسته های دقیق تر</p>
          )}
        </button>
        <div
          className={`accordion-body ${
            activeIndex === 0 ? "block" : "hidden"
          } px-4 pb-4 bg-white`}
        >
          {page !== "search" && (
            <div className="text-sm flex items-center pr-4 pb-2">
              <ChevronDown size={15} className="" />
              <Link href={page === "sub" ? `/browse/mid/${String(categoryId.midId)}` :  `/browse/main/${String(categoryId.mainId)}`} prefetch>
              <p className="px-1 font-bold">{headCategory}</p></Link>
            </div>
          )}

          {displayedItems.map((item: CategoryData) => (
            <ul key={item.id}>
              <li className="text-sm pr-12 py-2">
                <Link
                  href={`${link === "sub" ? "/browse/sub/" : "/browse/mid/"}${
                    item.id
                  }`}
                  className="cursor-pointer" prefetch
                >
                  {item.attributes.name}
                </Link>
              </li>
            </ul>
          ))}
          {!showAll &&
            typeof category === "object" &&
            "data" in category &&
            category.data.length > 5 && (
              <p
                className="text-sm font-bold pr-12 py-2 cursor-pointer"
                onClick={toggleShow}
              >
                نمایش تمام دسته بندی ها
              </p>
            )}
          {showAll && (
            <p
              className="text-sm font-bold pr-12 py-2 cursor-pointer"
              onClick={toggleShow}
            >
              نمایش دسته بندی کمتر
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarAccordionCategories;
