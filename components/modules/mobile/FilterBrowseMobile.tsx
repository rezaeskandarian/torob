"use client";

import CustomCheckBox from "@/components/ui/CustomCheckBox";
import CustomSwitchAvailable from "@/components/ui/CustomSwitchAvailable";
import CustomSwitchLocation from "@/components/ui/CustomSwitchLocation";
import { useParamManager } from "@/lib/params";
import {
  fetchProduct,
  removeFilter,
} from "@/redux/features/product/productSlice";
import { AppDispatch } from "@/redux/store";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const FilterBrowseMobile = ({ mobile }: { mobile: boolean }) => {
  const selector = useSelector(
    (state: any) => state.products.filters.stock_status
  );
  const { removeParam } = useParamManager();
  const param = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();



  

  const handleStockStatus = (id: string) => {
    if (selector === id) {
      dispatch(removeFilter("stock_status"));
      removeParam("stock_status");
      dispatch(fetchProduct());
    }
  };
  return (
    <div className="fixed bottom-[54px] w-screen items-center bg-white z-50 py-3 overflow-x-auto flex  border-b">
      {param.get("stock_status") && (
        <div className=" bg-medium-gray px-[8px]  rounded-lg">
          {param.get("stock_status") === "new" && (
            <div className="text-sm flex items-center justify-between ">
              {" "}
              <p className="border-l py-2 pl-2">نو</p>
              <X
                size={16}
                className="mr-2"
                onClick={() => handleStockStatus("new")}
              />
            </div>
          )}
          {param.get("stock_status") === "stock" && (
            <div className="text-sm flex items-center justify-between ">
              {" "}
              <p className="border-l py-2 pl-2">کارکرده</p>
              <X
                size={16}
                className="mr-2"
                onClick={() => handleStockStatus("stock")}
              />
            </div>
          )}
        </div>
      )}
      <CustomSwitchLocation mobile={mobile} />
      <CustomSwitchAvailable mobile={mobile} />
      <CustomCheckBox mobile={mobile} />
    </div>
  );
};

export default FilterBrowseMobile;
