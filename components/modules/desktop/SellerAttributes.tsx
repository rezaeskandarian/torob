"use client";

import { useEffect, useRef, useState } from "react";
import Seller from "./Seller";
import { LineChart } from "lucide-react";
import AttributesProduct from "./attributesProduct";

const SellerAttributes = ({ keymain, keysub , seller }: any) => {
  const sellerRef = useRef<HTMLDivElement>(null);
  const attributesRef = useRef<HTMLDivElement>(null);
  const [sellerHeight, setSellerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (sellerRef.current) {
        setSellerHeight(sellerRef.current.clientHeight);
      }
    };

    updateHeight(); // Initial height set
    window.addEventListener("resize", updateHeight); // Update height on window resize

    return () => {
      window.removeEventListener("resize", updateHeight); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    if (attributesRef.current) {
      attributesRef.current.style.height = `${sellerHeight}px`;
    }
  }, [sellerHeight]);



  return (
    <>
      <div
        ref={sellerRef}
        className="rounded-sm col-span-3 md:col-span-3 lg:col-span-4 xl:col-span-4"
      >
        <Seller seller={seller} />
        <div className="xs:block md:block xl:hidden lg:block my-3">
          <LineChart />
        </div>
      </div>

      <div
        ref={attributesRef}
        className="bg-white rounded-sm col-span-3 md:col-span-3 lg:col-span-2 xl:col-span-2 overflow-auto custom-overflow"
      >
        <AttributesProduct keymain={keymain} keysub={keysub} />
      </div>
    </>
  );
};

export default SellerAttributes;