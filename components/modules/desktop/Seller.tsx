"use client";

import Link from "next/link";
import { useState } from "react";
import guarantee from "@/public/image-desktop/guarantee.png";
import Image from "next/image";
import { Check, ChevronDown, Flag, MapPin, Star } from "lucide-react";
import { sp } from "@/lib/numbers";
import { Button } from "@/components/ui/button";
import { getFormattedJalaliDate } from "@/lib/datePersian";

const Seller = ({ seller }: any) => {
  const [activeDiv, setActiveDiv] = useState<string>("iran");
  const [activeOnline, setActiveOnline] = useState<string>("online");

  const [openGuarantyBox, setOpenGuarantyBox] = useState<string | null>(null);
  const [openInfoBox, setOpenInfoBox] = useState<string | null>(null);
  // Ensure seller is defined and has the expected structure
  const lowestPrice = seller
    ? Math.min(
        ...seller.map((i: any) => i.attributes.product_price_seller).map(Number)
      )
    : 0;

  const pricesWithGuaranty = seller
    ? seller
        .filter(
          (price: any) =>
            price.attributes.seller.data?.attributes.guaranty === true
        )
        .map((price: any) => price)
        .sort(
          (a: any, b: any) =>
            parseFloat(a.product_price_seller) -
            parseFloat(b.product_price_seller)
        )
    : [];

  const lowestPriceGuaranty = pricesWithGuaranty.length
    ? Math.min(
        ...pricesWithGuaranty.map((i: any) => i.attributes.product_price_seller)
      )
    : 0;

  const onlineStorePrices = seller
    ? seller
        .filter(
          (price: any) =>
            price.attributes.seller.data?.attributes.store === "online"
        )
        .map((price: any) => price)
        .sort(
          (a: any, b: any) =>
            parseFloat(a.product_price_seller) -
            parseFloat(b.product_price_seller)
        )
    : [];

  console.log(onlineStorePrices);

  const offlineStorePrices = seller
    ? seller
        .filter(
          (price: any) =>
            price.attributes.seller.data?.attributes.store === "physical"
        )
        .map((price: any) => price.attributes)
        .sort(
          (a: any, b: any) =>
            parseFloat(a.product_price_seller) -
            parseFloat(b.product_price_seller)
        )
    : [];

  const handleclick = (id: string) => {
    setActiveDiv(id);
  };

  const handleonline = (str: string) => {
    setActiveOnline(str);
  };

  const toggleGuarantyBox = (id: string) => {
    if (openGuarantyBox === id) {
      setOpenGuarantyBox(null); // Close the box if it's already open
    } else {
      setOpenGuarantyBox(id); // Open the new box
    }
  };

  const toggleInfoBox = (id: string) => {
    if (openInfoBox === id) {
      setOpenInfoBox(null); // Close the box if it's already open
    } else {
      setOpenInfoBox(id); // Open the new box
    }
  };
  console.log(onlineStorePrices);
  return (
    <>
      <div className="bg-white rounded-sm h-full ">
        <div className="flex justify-between px-6 pt-5">
          <div>
            <span className="font-bold text-lg">فروشنده ها</span>
          </div>
          <div>
            <Link
              href={"/pages/safe-shopping-guide"}
              className="text-sm text-red-torob"
              target="_blank"
            >
              راهنمای خرید امن
            </Link>
          </div>
        </div>

        <div className="flex mt-4 mb-4 mr-5 ">
          {pricesWithGuaranty.length > 0 && (
            <div
              onClick={() => handleclick("torob")} // Pass the id of the div
              className={`mx-3 cursor-pointer border rounded-xl px-2 py-1 text-[13px]    ${
                activeDiv === "torob" ? "border-gray-900" : "border-gray-300"
              } flex`}
            >
              <div className="ml-2 justify-center py-2 ">
                <Image
                  src={guarantee}
                  width={23}
                  height={23}
                  alt="گارانتی در ترب"
                  className="items-center justify-center"
                />
              </div>
              <div className="mx-1">
                {" "}
                <p> دارای ضمانت ترب</p>
                <p>از {sp(lowestPriceGuaranty)} تومان</p>
              </div>
            </div>
          )}
          <div
            onClick={() => handleclick("iran")} // Pass the id of the div
            className={`mx-1 cursor-pointer border rounded-xl px-4 py-1 text-[13px] ${
              activeDiv === "iran" ? "border-gray-900" : "border-gray-300"
            }`} // Conditionally apply the border color
          >
            <p>تمام ایران</p>

            <p> از {sp(lowestPrice)} تومان</p>
          </div>
        </div>

        {activeDiv === "iran" && (
          <div className="flex mt-6  mr-5">
            <ul className="flex ">
              {onlineStorePrices.length > 0 && (
                <li
                  className={`cursor-pointer mx-2  font-bold py-2 flex items-center h-fit   ${
                    activeOnline === "online" &&
                    " border-gray-600 border-b-4 rounded"
                  }`}
                  onClick={() => handleonline("online")}
                >
                  <MapPin
                    size={18}
                    className="text-white mx-1"
                    fill="#D73948"
                  />{" "}
                  خرید اینترنتی
                  <p className="px-2 bg-medium-gray mx-2 rounded-sm text-sm">
                    {sp(onlineStorePrices.length)}
                  </p>
                </li>
              )}

              {offlineStorePrices.length > 0 && (
                <li
                  className={`cursor-pointer mx-2  font-bold py-2 flex items-center h-fit  ${
                    activeOnline === "offline" &&
                    " border-gray-600 border-b-4 rounded"
                  }`}
                  onClick={() => handleonline("offline")}
                >
                  <MapPin
                    size={18}
                    className="text-white mx-1"
                    fill="#3468CC"
                  />{" "}
                  خرید حضوری
                  <p className="px-2 bg-medium-gray mx-2 rounded-sm text-sm">
                    {sp(offlineStorePrices.length)}
                  </p>
                </li>
              )}
            </ul>
          </div>
        )}

        <div>
          {(activeDiv === "iran" ? onlineStorePrices : pricesWithGuaranty).map(
            (i: any) => {
              const sellerId = i.attributes.seller.data.id;
              return (
                <div
                  key={sellerId}
                  className="flex px-7 border-t justify-between hover:bg-light-gray group"
                >
                  <div className="py-2">
                    <div className="flex w-full">
                      <div
                        className={`w-48 ${
                          i.attributes.seller.data.attributes.guaranty ===
                            true && "w-60"
                        }`}
                      >
                        <div className="flex items-center">
                          {i.attributes.seller.data.attributes.guaranty ===
                            true && (
                            <Image
                              src={guarantee}
                              width={21}
                              height={21}
                              alt="گارانتی ترب"
                              className="mx-1"
                            />
                          )}
                          <span className="font-bold py-2">
                            {i.attributes.seller.data.attributes.name}
                          </span>
                        </div>
                        <p className="text-sm mt-2">
                          {i.attributes.seller.data.attributes.city}
                        </p>
                      </div>
                      <div className="mt-1 w-full ml-3">
                        <div className="flex">
                          {i.attributes.seller.data.attributes.guaranty ===
                            true && (
                            <div
                              className="bg-[#1C1C5D] rounded-full flex items-center ml-2 cursor-pointer "
                              onClick={() => toggleGuarantyBox(sellerId)}
                            >
                              <p className=" text-[12px] mr-3 py-1 bg-gradient-to-l from-[#10FFEE] to-[#FFFF00] bg-clip-text text-transparent">
                                ضمانت ترب
                              </p>
                              <ChevronDown
                                size={16}
                                className={` mx-1 text-[#FFFF00] ${
                                  openGuarantyBox === sellerId
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </div>
                          )}

                          <div
                            className="bg-[#DAF2D5] rounded-full flex items-center ml-2 cursor-pointer w-fit "
                            onClick={() => toggleInfoBox(sellerId)}
                          >
                            {openInfoBox !== sellerId && (
                              <div className=" text-[12px] mr-3 py-1 text-black flex items-center ">
                                <Star
                                  size={10}
                                  fill="#248212"
                                  color="#248212"
                                />
                                <p className="  px-1">
                                  {sp(
                                    i.attributes.seller.data.attributes.score
                                  )}
                                </p>
                                <p>
                                  (
                                  {getFormattedJalaliDate(
                                    i.attributes.seller.data.attributes
                                      .datePermitTorob
                                  )}{" "}
                                  در ترب)
                                </p>
                              </div>
                            )}

                            <ChevronDown
                              size={15}
                              className={` mx-1 justify-center    ${
                                openInfoBox === sellerId
                                  ? "rotate-180 mx-auto w-[200px]"
                                  : ""
                              }`}
                            />
                          </div>

                          <Button
                            variant={"secondary"}
                            className="rounded-full text-gray-600 border hover:border-blue-900 h-6 px-2 text-[13px] font-thin group-hover:bg-white"
                          >
                            <Flag className="px-1 w-5" /> گزارش
                          </Button>
                        </div>
                        {openGuarantyBox === sellerId && (
                          <div className="bg-[#1C1C5D] text-white rounded-2xl px-3 w-full text-[13px] mt-2 ">
                            <p className="pt-4">
                              ترب تا ۷ روز کاری ضمانت می‌کند:
                            </p>
                            <div className="flex items-center my-2">
                              <Check size={15} className="mx-1" /> بازگشت پول در
                              صورت معیوب بودن کالا
                            </div>
                            <div className="flex items-center my-2">
                              <Check size={15} className="mx-1" /> بازگشت پول در
                              صورت مغایرت کالا
                            </div>
                            <div className="flex items-center my-2">
                              <Check size={15} className="mx-1" /> بازگشت پول در
                              صورت ارسال نشدن کالا
                            </div>
                            <div className="pt-2 pb-4">
                              <Button
                                variant={"outline"}
                                className="bg-inherit text-[13px] mx-1 hover:bg-inherit hover:text-white"
                              >
                                شرایط استفاده از ضمانت
                              </Button>
                              <Button
                                variant={"outline"}
                                className="bg-inherit text-[13px] mx-1 hover:bg-inherit hover:text-white"
                              >
                                {" "}
                                ضمانت ترب چیست ؟
                              </Button>
                            </div>
                          </div>
                        )}

                        {openInfoBox === sellerId && (
                          <div className="bg-[#DAF2D5]  rounded-2xl px-3 w-full text-[13px] mt-2 ">
                            <p className="pt-4 flex">
                              امتیاز فروشگاه
                              <div className=" text-[12px] mr-3 text-black flex items-center ">
                                <Star
                                  size={10}
                                  fill="#248212"
                                  color="#248212"
                                />
                                <p className="  px-1">
                                  {sp(
                                    i.attributes.seller.data.attributes.score
                                  )}
                                </p>
                                <p>
                                  (
                                  {getFormattedJalaliDate(
                                    i.attributes.seller.data.attributes
                                      .datePermitTorob
                                  )}{" "}
                                  در ترب)
                                </p>
                              </div>
                            </p>

                            <div className="pt-2 pb-4">
                              <Button
                                variant={"outline"}
                                className="bg-inherit text-[13px] mx-1 hover:bg-inherit text-black "
                              >
                                پروفایل فروشگاه
                              </Button>
                              <Button
                                variant={"outline"}
                                className="bg-inherit text-[13px] mx-1 hover:bg-inherit "
                              >
                                {" "}
                                شیوه ارزیابی فروشگاه
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="my-2">
                          <p className="text-sm text-gray-700">
                            {i.attributes.description_product}
                          </p>
                          <p className="text-gray-600 text-[13px] my-1">
                            {i.attributes.less_description_product}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-4">
                    <p className="text-center text-red-torob py-2">
                      {sp(i.attributes.product_price_seller)} تومان
                    </p>
                    <Button className="text-sm rounded-lg bg-red-torob hover:bg-red-torob">
                      خرید اینترنتی
                    </Button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default Seller;
