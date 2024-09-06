"use client";

import { Search } from "lucide-react";
import { Input } from "./input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

const CustomInputSearch = ({
  button,
  mobileStyle,
}: {
  button: boolean;
  mobileStyle: boolean;
}) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const searchHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (search === "") {
      router.push("/browse/main/1");
      return; // Add a return statement to prevent further execution
    }

    router.push(`/search?q=${search}`); // Fix the template literal syntax
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  console.log(mobileStyle);
  return (
    <div>
      <form onSubmit={searchHandler} className="flex">
        <div
          className={` flex items-center w-full py-1 border border-gray-300 ${
            mobileStyle ? "bg-medium-gray" : "bg-white"
          }`}
        >
          {!button && (
            <Search
              className={`text-slate-500 mx-2 ${
                mobileStyle && "bg-medium-gray"
              }`}
            />
          )}

          <Input
            type="text"
            placeholder="نام کالا را وارد کنید"
            className={`border-none size-full focus:outline-none focus:ring-0 focus:border-transparent ${
              mobileStyle && " bg-medium-gray"
            } `}
            name="value"
            value={search}
            onChange={handleChange}
          />
        </div>
        {button && (
          <Button
            className="bg-red-700 rounded-tr-none rounded-br-none h-12"
            type="submit"
          >
            <Search />
          </Button>
        )}
      </form>
    </div>
  );
};

export default CustomInputSearch;
