"use client";

import { ArrowRight, Bell, Heart, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

const TopNavProduct = ({ name }: { name: string }) => {
  const router = useRouter();
  const backHandler = () => {
    router.back();
  };
  return (
    <div className="fixed top-0 flex bg-white  px-2 items-center z-50 w-full ">
      <ArrowRight className="mx-3" size={45} onClick={backHandler} />
      <p className="line-clamp-1 text-sm font-bold">{name}</p>
      <div className=" flex">
        <div className="px-1  text-gray-600 cursor-pointer">
          <Bell />
        </div>
        <div className="px-1 text-gray-600 cursor-pointer">
          <Heart />
        </div>
        <div className="px-1 text-gray-600 cursor-pointer">
          <Share2 />
        </div>
      </div>
    </div>
  );
};

export default TopNavProduct;
