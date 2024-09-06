"use client";

import { e2p } from "@/lib/numbers";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProductCardProps {
  image: {
    data: {
      attributes: {
        url: string;
      };
    }[];
  };
}

const ImageGalleryProductCard = ({
  image: { data },
}: ImageGalleryProductCardProps) => {
  const [mainImage, setMainImage] = useState<string>(data[0].attributes.url);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const handleImageChange = (newIndex: number) => {
    setFade(true); // Start fade-out
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setMainImage(data[newIndex].attributes.url);
      setFade(false); // Fade-in new image
    }, 300); // Adjust the timing to match the transition duration
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % data.length;
    setCurrentIndex(newIndex);
    setMainImage(data[newIndex].attributes.url);
    handleImageChange(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + data.length) % data.length;
    setCurrentIndex(newIndex);
    setMainImage(data[newIndex].attributes.url);
    handleImageChange(newIndex);
  };

  return (
    <div className="mb-10 relative group">
      <div className="absolute flex bg-[#999999] items-center px-1 py-[2px] rounded group-hover:opacity-0">
        <Camera
          size={16}
          className=" text-white  rounded"
          fill="white"
          color="#999999"
        />
        <p className="text-white text-[10px] items-center ">
          {e2p(data.length)}
        </p>
      </div>
      <div className="absolute  bg-[#999999] rounded my-2 py-[2px]   transform -translate-y-1/2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
        <p className="text-[10px] text-white ">
          {e2p(currentIndex + 1)}/{e2p(data.length)}
        </p>
      </div>
      <div className="overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL_API}${mainImage}`}
          width={200}
          height={200}
          alt={"product Image"}
          className={`w-auto h-auto transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-0" : "opacity-100"
          }`}
          key={mainImage}
        />
      </div>
      <div className="flex  absolute top-2/2 transform -translate-y-1/2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
        <ChevronRight
          size={21}
          className="text-white cursor-pointer bg-[#999999] hover:bg-[#5C5C5C] p-1 rounded-r"
          onClick={nextImage}
        />
        <ChevronLeft
          size={21}
          className="text-white cursor-pointer bg-[#999999] hover:bg-[#5C5C5C] p-1 rounded-l "
          onClick={prevImage}
        />
      </div>
    </div>
  );
};

export default ImageGalleryProductCard;
