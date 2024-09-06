import { useParamManager } from "@/lib/params";

import { Switch } from "./switch";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchProduct, removeFilter, setFilter } from "@/redux/features/product/productSlice";

const CustomSwitchAvailable = () => {
  const param = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector( (state : any) => state.products.filters.available === true);
  const { addParam, removeParam } = useParamManager();
 
     

  useEffect(() => {
    
    if (param.get("available") === "true") {
      dispatch(setFilter({ key: "available", value: true }));
      
    } else {
      dispatch(removeFilter("available"));
    }
  }, [param , dispatch  ]);
  
  

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
    <div className="px-3 items-center flex border-l border-gray-400 ">
      <Switch
        id="available"
        style={{ direction: "ltr" }}
        checked={selector}
        onCheckedChange={handleSwitchChange}
      />
      <label htmlFor="available" className="cursor-pointer text-sm pr-2">
        فقط موجود ها
      </label>
      
    </div>
  );
};

export default CustomSwitchAvailable;
