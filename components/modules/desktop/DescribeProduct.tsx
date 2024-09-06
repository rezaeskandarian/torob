import { Button } from "@/components/ui/button";
import { sp } from "@/lib/numbers";
import { Bell, ChevronDown, Flag, Heart, Share2 } from "lucide-react";

const DescribeProduct = ({ name, lowestPrice }: any) => {
  
  return (
    <div className=" line-clamp-3 px-5 justify-center items-center  h-full flex">
      <div className="">
        <p className="font-semibold block py-3">{name}</p>
        <div className="justify-between flex items-center py-4">
          <div className="flex items-center"> {sp(lowestPrice.length)} فروشنده دیگر  <ChevronDown size={16} className="mx-1" /></div>
          <div className="flex items-center">
            <div className="px-3  text-gray-600 cursor-pointer">
              <Bell />
            </div>
            <div className="px-3 text-gray-600 cursor-pointer">
              <Heart />
            </div>
            <div className="px-3 text-gray-600 cursor-pointer">
              <Share2 />
            </div>
            <Button
              variant={"secondary"}
              size={"sm"}
              className="rounded-full text-gray-700 border hover:border-blue-900
            "
            >
              <Flag className="px-1" /> گزارش
            </Button>
          </div>
        </div>
        <div className="bg-[#D73948] rounded-lg justify-between flex py-2 px-4 items-center cursor-pointer my-3 hover:bg-red-500">
          <div>
            <p className="text-white font-bold text-lg px-2 ">
              {lowestPrice[0].attributes.seller.data.attributes.name}
            </p>
            <p className="text-white font-bold text-lg py-1 px-2">
              {sp(lowestPrice[0].attributes.product_price_seller)} تومان
            </p>
          </div>
          <div className="">
            <Button
              className="rounded-full   bg-red-torob  text-white
            "
            >
              ارزانترین
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescribeProduct;
