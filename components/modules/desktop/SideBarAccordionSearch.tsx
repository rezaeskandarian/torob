"use client";

import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";

const SideBarAccordionSearch = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [value , setValue] = useState<string>("");

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleChange = (e : any) => {
    e.preventDefault();
    setValue(e.target.value);
  }

  return (
    <div className="accordion">
      {[1].map((item, index) => (
        <div key={index} className="accordion-item border-b">
          <button
            className="accordion-header flex items-center bg-white p-4 w-full  text-sm"
            onClick={() => toggleAccordion(index)}
          >
            <div className="pl-2">
              {activeIndex === index ? (
                <ChevronUp size={15} />
              ) : (
                <ChevronDown size={15} />
              )}
            </div>
            جستجو در نتایج
          </button>
          <div
            className={`accordion-body ${
              activeIndex === index ? "block" : "hidden"
            } px-4 pb-4 bg-white`}
          >
            <div className="flex border border-gray-300 rounded-sm w-full items-center py-1">
            <Input className="border-none size-full focus:outline-none focus:ring-0 focus:border-transparent" type="text" name="search" value={value} onChange={handleChange} />
            
            <Search className="text-gray-500 mx-2"  />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBarAccordionSearch;
