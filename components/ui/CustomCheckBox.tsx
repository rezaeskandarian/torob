"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "./checkbox";
import { useParamManager } from "@/lib/params";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  fetchProduct,
  removeFilter,
  setFilter,
} from "@/redux/features/product/productSlice";
import { ChevronUp, X } from "lucide-react";

const CustomCheckBox = ({ mobile }: { mobile: boolean }) => {
  const param = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector(
    (state: any) => state.products.filters.stock_status
  );
  const { addParam, removeParam } = useParamManager();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    // Sync Redux state with URL params
    const stockStatus = param.get("stock_status");
    if (stockStatus) {
      dispatch(setFilter({ key: "stock_status", value: stockStatus }));
      dispatch(fetchProduct());
    }
  }, [param, dispatch]);

  const handleCheckboxChange = (id: string) => {
    setOpenModal(!openModal);
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

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      {mobile ? (
        <>
          {param.get("stock_status") ? null : (
            <div className="flex items-center w-full " onClick={handleModal}>
              <p className="text-sm w-[max-content] ">وضعیت کارکرد</p>
              <ChevronUp size={15} />
            </div>
          )}

          {openModal && (
            <div className="bg-white   fixed bottom-[97px] w-full rounded-t-3xl  shadow-[rgba(0,0,0,0.1)_0px_-5px_15px_0px] py-1  ">
              <div className="flex justify-between px-5 py-4 ">
                <p className="text-sm font-bold">وضعیت کارکرد</p>
                <X size={16} className="mx-1" onClick={handleModal} />
              </div>
              <div className="px-5 py-4 flex flex-col space-y-2">
                <div className="flex items-center space-x-2 my-2">
                  <input
                    type="radio"
                    id="new"
                    name="status"
                    value="new"
                    className="form-radio accent-black focus:ring-black scale-125	 "
                    checked={selector === "new"}
                    onChange={() => handleCheckboxChange("new")}
                  />
                  <label
                    htmlFor="new"
                    className="text-sm cursor-pointer peer-checked:text-black px-2 "
                  >
                    نو
                  </label>
                </div>
                <div className="flex items-center space-x-2 my-2">
                  <input
                    type="radio"
                    id="stock"
                    name="status"
                    value="stock"
                    className="form-radio accent-black focus:ring-black scale-125	"
                    checked={selector === "stock"}
                    onChange={() => handleCheckboxChange("stock")}
                  />
                  <label
                    htmlFor="stock"
                    className="text-sm cursor-pointer peer-checked:text-black px-2"
                  >
                    کارکرده
                  </label>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
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
      )}
    </>
  );
};

export default CustomCheckBox;
