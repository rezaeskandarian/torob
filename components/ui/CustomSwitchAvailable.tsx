"use client";
import { useParamManager } from "@/lib/params";

import { Switch } from "./switch";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  fetchProduct,
  removeFilter,
  setFilter,
} from "@/redux/features/product/productSlice";

const CustomSwitchAvailable = ({ mobile }: { mobile: boolean }) => {
  const param = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector(
    (state: any) => state.products.filters.available === true
  );
  const { addParam, removeParam } = useParamManager();

  useEffect(() => {
    if (param.get("available") === "true") {
      dispatch(setFilter({ key: "available", value: true }));
    } else {
      dispatch(removeFilter("available"));
    }
  }, [param, dispatch]);

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      dispatch(setFilter({ key: "available", value: true }));
      addParam("available", "true");
    } else {
      dispatch(removeFilter("available"));
      removeParam("available");
    }
    dispatch(fetchProduct());
  };
  return (
    <div
      className={` items-center border-gray-400 ${
        mobile ? "flex flex-row-reverse " : "flex border-l px-3"
      }`}
    >
      <Switch
        id="available"
        style={{ direction: "ltr" }}
        checked={selector}
        onCheckedChange={handleSwitchChange}
        className={`${mobile && "mx-2"}`}
      />
      <label
        htmlFor="available"
        className={`cursor-pointer text-sm   ${mobile  ? "w-[max-content] ": "pr-2"}`}
      >
        فقط موجود ها
      </label>
    </div>
  );
};

export default CustomSwitchAvailable;
