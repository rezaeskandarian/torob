import {  useEffect } from "react";
import { Checkbox } from "./checkbox";
import { useParamManager } from "@/lib/params";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchProduct, removeFilter, setFilter } from "@/redux/features/product/productSlice";

const CustomCheckBox = () => {
  const param = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector((state : any) => state.products.filters.stock_status)
  const { addParam, removeParam } = useParamManager();
 
  

  useEffect(() => {
    // Sync Redux state with URL params
    const stockStatus = param.get("stock_status");
    if (stockStatus) {
      dispatch(setFilter({ key: "stock_status", value: stockStatus }));
      dispatch(fetchProduct());
    }
  }, [param, dispatch]);

  const handleCheckboxChange = (id: string) => {
    if (selector === id) {
      dispatch(removeFilter("stock_status"));
      removeParam("stock_status");
      dispatch(fetchProduct());
    } else {
      addParam("stock_status", id);
      dispatch(setFilter({ key: "stock_status", value: id }));
      
      dispatch(fetchProduct());
    }
  };


  return (
    <div className="items-center mx-3 flex border-l border-gray-400">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="new"
          checked={selector === "new"}
          onCheckedChange={() => handleCheckboxChange("new")}
        />
        <label
          htmlFor="new"
          className="text-sm font-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2 cursor-pointer"
        >
          نو
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="stock"
          checked={selector === "stock"}
          onCheckedChange={() => handleCheckboxChange("stock")}
        />
        <label
          htmlFor="stock"
          className="text-sm font-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-2 cursor-pointer"
        >
          کارکرده
        </label>
      </div>
    </div>
  );
};

export default CustomCheckBox;