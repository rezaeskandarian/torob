"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import CustomInput from "@/components/ui/CustomInput";
import { useParamManager } from "@/lib/params";
import { p2e, re } from "@/lib/numbers";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  removeFilter,
  setFilter,
} from "@/redux/features/product/productSlice";
import { AppDispatch } from "@/redux/store";

type ValueProps = {
  min: string;
  max: string;
};

const SideBarAccordionPrice = () => {
  const { addMultipleParams, removeMultipleParams } = useParamManager();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { min: minPrice, max: maxPrice } = useSelector(
    (state: any) => state.products
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [values, setValues] = useState<ValueProps>({
    min: "",
    max: "",
  });

  // Initialize values based on URL parameters or default values
  useEffect(() => {
    const minParam = searchParams.get("price__gt") || minPrice || "";
    const maxParam = searchParams.get("price__lt") || maxPrice || "";

    setValues({
      min: re(p2e(minParam)),
      max: re(p2e(maxParam)),
    });
  }, [searchParams, minPrice, maxPrice]);

  // Track previous search params to avoid fetching on every input change
  const [prevSearchParams, setPrevSearchParams] = useState({
    min: "",
    max: "",
  });

  useEffect(() => {
    const currentMin = searchParams.get("price__gt") || "";
    const currentMax = searchParams.get("price__lt") || "";

    if (
      currentMin !== prevSearchParams.min ||
      currentMax !== prevSearchParams.max
    ) {
      setPrevSearchParams({ min: currentMin, max: currentMax });

      if (currentMin || currentMax) {
        dispatch(setFilter({ key: "greaterthan", value: currentMin }));
        dispatch(setFilter({ key: "lessthan", value: currentMax }));
        dispatch(fetchProduct());
      } else {
        dispatch(removeFilter("greaterthan"));
        dispatch(removeFilter("lessthan"));
        dispatch(fetchProduct());
      }
    }
  }, [searchParams, dispatch, prevSearchParams]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleActivePrice = () => {
    const min = re(p2e(values.min)) || "0";
    const max = re(p2e(values.max)) || "0";

    const paramsToAdd: { key: string; value: string }[] = [];

    if (values.min !== "") {
      paramsToAdd.push({ key: "price__gt", value: min });
    }

    if (values.max !== "") {
      paramsToAdd.push({ key: "price__lt", value: max });
    }

    if (values.min === "" && values.max === "") {
      paramsToAdd.push({ key: "price__gt", value: "0" });
      paramsToAdd.push({ key: "price__lt", value: "0" });
    }

    addMultipleParams(paramsToAdd);

    dispatch(setFilter({ key: "greaterthan", value: re(p2e(values.min)) }));
    dispatch(setFilter({ key: "lessthan", value: re(p2e(values.max)) }));
    dispatch(fetchProduct());
  };

  const handleDeletePrice = () => {
    setValues({
      min: "",
      max: "",
    });
    removeMultipleParams(["price__gt", "price__lt"]);
    dispatch(removeFilter("greaterthan"));
    dispatch(removeFilter("lessthan"));
    dispatch(fetchProduct());
  };

  return (
    <div className="accordion">
      {[1].map((item, index) => (
        <div key={index} className="accordion-item border-b">
          <button
            className="accordion-header flex items-center bg-white p-4 w-full text-sm"
            onClick={() => toggleAccordion(index)}
          >
            <div className="pl-2">
              {activeIndex === index ? (
                <ChevronUp size={15} />
              ) : (
                <ChevronDown size={15} />
              )}
            </div>
            قیمت
          </button>
          <div
            className={`accordion-body ${
              activeIndex === index ? "block" : "hidden"
            } px-4 pb-4 bg-white`}
          >
            <div>
              <div className="flex items-center space-x-2">
                <div className="flex border border-gray-300 rounded-sm w-full items-center py-1">
                  <span className="text-gray-600 pr-2">از</span>
                  <CustomInput
                    onChange={inputHandler}
                    maxLength="22"
                    name="min"
                    value={values.min}
                    style={{ direction: "ltr" }}
                    className="border-none size-full focus:outline-none focus:ring-0 focus:border-transparent flex-grow ml-[80px] py-2"
                  />
                </div>
                <p className="pr-3">تومان</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex border border-gray-300 rounded-sm w-full items-center py-1 my-3">
                  <span className="text-gray-600 pr-2">تا</span>
                  <CustomInput
                    onChange={inputHandler}
                    maxLength="22"
                    name="max"
                    value={values.max}
                    style={{ direction: "ltr" }}
                    className="border-none size-full focus:outline-none focus:ring-0 focus:border-transparent flex-grow ml-[80px] py-2"
                  />
                </div>
                <p className="pr-3">تومان</p>
              </div>
            </div>
            <div className="flex">
              <Button className="flex-grow mx-2" onClick={handleActivePrice}>
                اعمال فیلتر
              </Button>
              <Button
                variant={"outline"}
                className="mx-1 border-black"
                onClick={handleDeletePrice}
              >
                حذف
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBarAccordionPrice;
