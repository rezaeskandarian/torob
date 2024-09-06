import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useParamManager } from "@/lib/params";
import { useSearchParams } from "next/navigation";
import { Button } from "./button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { removeFilter, setFilter } from "@/redux/features/product/productSlice"; // Import setFilter action
import { fetchProduct } from "@/redux/features/product/productSlice"; // Import fetchProduct action

const CustomMegaMenuItem = () => {
  const param = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { addParam, removeParam } = useParamManager();

  const initialSelectedText = (() => {
    const sortParam = param.get("sort");
    switch (sortParam) {
      case "-price":
        return "ارزان ترین";
      case "price":
        return "گران ترین";
      case "date":
        return "جدید ترین";
      case "":
        return "محبوب ترین";
      default:
        return "مرتب سازی";
    }
  })();

  const [selectedText, setSelectedText] = useState<string | null>(
    initialSelectedText
  );
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const dropdown = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropDownOpen((prev) => !prev);
  };

  const handleSelectedItem = (item: string) => {
    setSelectedText(item);
    setDropDownOpen(false);

    let sortValue = "";
    switch (item) {
      case "مرتب سازی":
        break;
      case "محبوب ترین":
        sortValue = "";
        removeParam("sort");
        dispatch(removeFilter("sort"));
        break;
      case "ارزان ترین":
        sortValue = "-price";
        break;
      case "گران ترین":
        sortValue = "price";
        break;
      case "جدید ترین":
        sortValue = "date";
        break;
    }
    if (sortValue !== "") {
      addParam("sort", sortValue);
      dispatch(setFilter({ key: "sort", value: sortValue }));
    }

    if (sortValue == "") {
      dispatch(removeFilter("sort"));
      removeParam("sort");
    }

    // Dispatch the fetchProduct action to refetch products with the new sort filter
    dispatch(fetchProduct());
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdown.current && !dropdown.current.contains(event.target as Node)) {
      setDropDownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const sortParam = param.get("sort");
    console.log(sortParam);
    switch (sortParam) {
      case "-price":
        setSelectedText("ارزان ترین");
        break;
      case "price":
        setSelectedText("گران ترین");
        break;
      case "date":
        setSelectedText("جدید ترین");
        break;
      case "":
        setSelectedText("محبوب ترین");
        break;
      default:
        setSelectedText("مرتب سازی");
        break;
    }

    if (sortParam !== "") {
      dispatch(setFilter({ key: "sort", value: sortParam }));
    }
    if (sortParam == null) {
      dispatch(removeFilter("sort"));
    }

    // Dispatch the fetchProduct action to refetch products with the new sort filter
    dispatch(fetchProduct());
  }, [param, dispatch]);

  return (
    <div className="relative z-10" ref={dropdown}>
      <Button variant={"ghost"} className="font-thin" onClick={toggleDropdown}>
        {selectedText}
        <ChevronDown
          size={14}
          className={`mx-1 transition-transform duration-200 ${
            dropDownOpen ? "rotate-180" : ""
          }`}
        />
      </Button>
      {dropDownOpen && (
        <div className="bg-white mx-auto items-center absolute rounded-sm z-50 py-2">
          <div
            className="px-4 py-[2px] text-sm cursor-pointer text-center"
            onClick={() => handleSelectedItem("محبوب ترین")}
          >
            محبوب ترین
          </div>
          <div
            className="px-4 py-[2px] text-sm cursor-pointer text-center"
            onClick={() => handleSelectedItem("ارزان ترین")}
          >
            ارزان ترین
          </div>
          <div
            className="px-4 py-[2px] text-sm cursor-pointer text-center"
            onClick={() => handleSelectedItem("گران ترین")}
          >
            گران ترین
          </div>
          <div
            className="px-4 py-[2px] text-sm cursor-pointer text-center"
            onClick={() => handleSelectedItem("جدید ترین")}
          >
            جدید ترین
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomMegaMenuItem;
