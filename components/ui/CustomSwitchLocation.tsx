"use client";

import { useParamManager } from "@/lib/params";
import { MapPin } from "lucide-react";
import { Switch } from "./switch";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  removeFilter,
  setFilter,
} from "@/redux/features/product/productSlice";
import { AppDispatch } from "@/redux/store";

const CustomSwitchLocation = ({ mobile }: { mobile: boolean }) => {
  const param = useSearchParams();
  const { addParam, removeParam } = useParamManager();
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector(
    (state: any) => state.products.filters.shop_type === "offline"
  );

  useEffect(() => {
    if (param.get("shop_type") === "offline") {
      dispatch(setFilter({ key: "shop_type", value: "offline" }));
    } else {
      dispatch(removeFilter("shop_type"));
    }
  }, [param, dispatch]);

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      dispatch(setFilter({ key: "shop_type", value: "offline" }));
      addParam("shop_type", "offline");
    } else {
      dispatch(removeFilter("shop_type"));
      removeParam("shop_type");
    }
    dispatch(fetchProduct());
  };

  return (
    <div
      className={`px-2 items-center   border-gray-400 w-fit ${
        mobile ? " flex flex-row-reverse" : " flex border-l"
      } `}
    >
      <Switch
        id="location"
        style={{ direction: "ltr" }}
        checked={selector}
        onCheckedChange={handleSwitchChange}
        className={`${mobile && "mx-3"} `}
      />
      <label htmlFor="location" className={`cursor-pointer text-sm pr-2 block ${mobile && "w-[max-content] "} `}>
        امکان خرید حضوری
      </label>
      <div className={`${mobile ? "" : "mx-3"}`}>
        <MapPin size={16} className="text-white" fill="#3468CC" />
      </div>
    </div>
  );
};

export default CustomSwitchLocation;
