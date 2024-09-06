"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface SubCategory {
  id: number;
  attributes: {
    name: string;
  };
}

interface MidCategory {
  id: number;
  attributes: {
    name: string;
    sub_categories: {
      data: SubCategory[];
    };
  };
}

interface MainCategory {
  id: number;
  attributes: {
    name: string;
    mid_categories: {
      data: MidCategory[];
    };
  };
}

const MainMenu = ({ data }: any) => {
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const [activeMainCategory, setActiveMainCategory] = useState<
    MainCategory | string | null
  >(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the width on mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setCategories(data);
    }
  }, [data]);

  useEffect(() => {
    if (activeMainCategory) {
      document.body.style.overflow = "hidden"; // Disable scrolling on HomePage
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [activeMainCategory]);

  const handleMainCategoryClick = (category: any) => {
    if (activeMainCategory === category) {
      setActiveMainCategory(null);
    } else {
      setActiveMainCategory(category);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setActiveMainCategory(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getCategoriesToDisplay = () => {
    const breakpoints = {
      sm: 2, // Small screens
      md: 4, // Medium screens
      lg: 6, // Large screens
      xl: Infinity, // Extra-large screens and above
    };

    let visibleCount = breakpoints.xl; // Default to show all
    if (windowWidth < 750) {
      visibleCount = breakpoints.sm;
    } else if (windowWidth < 850) {
      visibleCount = breakpoints.md;
    } else if (windowWidth < 1600) {
      visibleCount = breakpoints.lg;
    }

    if (categories.length > visibleCount) {
      return {
        visible: categories.slice(0, visibleCount),
        overflow: categories.slice(visibleCount),
      };
    }

    return { visible: categories, overflow: [] };
  };

  const { visible, overflow } = getCategoriesToDisplay();

  const handleLinkClick = () => {
    setActiveMainCategory(null);
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex mx-4 overflow-auto">
        {categories.length > 0 ? (
          <ul className="flex space-x-4">
            {visible.map((category: any) => (
              <li
                key={category.id}
                className="relative text-sm text-slate-500 cursor-pointer"
                onClick={() => handleMainCategoryClick(category)}
                data-category={category.id}
              >
                &nbsp; &nbsp;
                {category.attributes.name}
              </li>
            ))}
            {overflow.length > 0 && (
              <li
                className="relative text-sm text-slate-500 cursor-pointer"
                onClick={() => handleMainCategoryClick("other")}
              >
                سایر دسته‌ها
              </li>
            )}
          </ul>
        ) : (
          <div className="items-center">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-4 w-[100px] bg-gray-300 mx-2"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        {typeof activeMainCategory === "object" &&
          activeMainCategory !== null && (
            <div
              className="absolute top-9 left-10 right-10 mt-2 bg-light-gray rounded-md p-5 h-[550px]  z-50 overflow-y-auto"
              style={{ width: "95vw" }}
            >
              <Link
                prefetch
                href={`/browse/main/${activeMainCategory.id}`}
                className="border-b w-full block font-bold my-2 pb-2"
                onClick={handleLinkClick}
              >
                {activeMainCategory.attributes.name}
              </Link>
              <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-7 gap-4">
                {activeMainCategory.attributes.mid_categories.data.map(
                  (midCategory: MidCategory) => (
                    <div key={midCategory.id} className="flex flex-col">
                      <div>
                        <Link
                          prefetch
                          href={`/browse/mid/${midCategory.id}`}
                          className="font-semibold text-gray-700 hover:text-red-700 text-sm cursor-pointer"
                          onClick={handleLinkClick}
                        >
                          {midCategory.attributes.name}
                        </Link>
                      </div>
                      <div className="pl-4 flex flex-col">
                        {midCategory.attributes.sub_categories.data.map(
                          (sub: SubCategory) => (
                            <Link
                              prefetch
                              href={`/browse/sub/${sub.id}`}
                              key={sub.id}
                              onClick={handleLinkClick}
                            >
                              <p className="block text-gray-700 hover:text-red-700 py-[5px] text-sm font-thin">
                                {sub.attributes.name}
                              </p>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
      </div>

      {activeMainCategory === "other" && (
        <div
          className="absolute top-11 left-10 right-10 mt-2 bg-light-gray rounded-md p-5 h-[550px]  z-50 overflow-y-auto"
          style={{ width: "95vw" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-8 gap-4">
            {overflow.map((category: MainCategory) => (
              <div key={category.id} className="flex flex-col">
                <div className="font-semibold text-gray-700 hover:text-red-600 text-[16px]  cursor-pointer">
                  <Link
                    prefetch
                    href={`/browse/main/${category.id}`}
                    className="font-bold "
                    onClick={handleLinkClick}
                  >
                    {category.attributes.name}
                  </Link>
                </div>
                <div className="pl-4 flex flex-col">
                  {category.attributes.mid_categories.data.map(
                    (midCategory: MidCategory) => (
                      <div key={midCategory.id} className="flex flex-col">
                        <div className="font-semibold text-gray-700 hover:text-red-600 text-[15px] cursor-pointer">
                          <Link
                            prefetch
                            href={`/browse/mid/${midCategory.id}`}
                            onClick={handleLinkClick}
                          >
                            {midCategory.attributes.name}
                          </Link>
                        </div>
                        <div className="pl-4 flex flex-col">
                          {midCategory.attributes.sub_categories.data.map(
                            (sub: SubCategory) => (
                              <Link
                                prefetch
                                href={`/browse/sub/${sub.id}`}
                                key={sub.id}
                                onClick={handleLinkClick}
                              >
                                <p className="block text-gray-700 hover:text-red-600 py-[3px] text-[13px]">
                                  {sub.attributes.name}
                                </p>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
