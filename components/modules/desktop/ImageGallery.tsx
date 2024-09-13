"use client";
import { Button } from "@/components/ui/button";
import { e2p } from "@/lib/numbers";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type ImageFormats = {
  thumbnail: {
    url: string;
  };
};

type ImageAttributes = {
  formats: ImageFormats;
  url: string;
};

type ImageProps = {
  id: number;
  attributes: ImageAttributes;
};

type ImageGalleryProps = {
  images: ImageProps[];
  mobile: boolean;
};

const ImageGallery = ({ images, mobile }: ImageGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0].attributes.url);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = (url: string, index: number) => {
    setMainImage(url);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setMainImage(images[newIndex].attributes.url);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setMainImage(images[newIndex].attributes.url);
  };

  return (
    <>
      {mobile === false ? (
        <>
          <div className="flex my-3 h-[370px]">
            {images.length !== 1 && (
              <div className="w-1/4 pr-4 flex flex-col">
                {images.slice(0, 3).map((image, index) => (
                  <Image
                    key={image.id}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_API}${image.attributes.formats.thumbnail.url}`}
                    alt="عکس محصولات"
                    width={200}
                    height={200}
                    className="cursor-pointer mb-4 border rounded-sm p-1"
                    onClick={() => handleClick(image.attributes.url, index)}
                  />
                ))}
                {images.length > 3 && (
                  <div
                    className="border rounded-sm text-center py-5 px-5 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    {e2p(images.length - 3)}+
                  </div>
                )}
              </div>
            )}

            <div
              className={
                images.length === 1
                  ? "w-4/4  flex items-center justify-center border rounded-sm h-full mx-3  "
                  : "w-3/4 mr-2 mx-auto flex items-center justify-center border rounded-sm h-full "
              }
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_API}${mainImage}`}
                alt=""
                width={350}
                height={350}
                className="cursor-pointer mb-4 p-1 mx-auto justify-center items-center "
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="overflow-x-auto flex mt-4 py-2 h-36 w-full justify-between  ">
            {images.map((image, index) => (
              <Image
                key={image.id}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_API}${image.attributes.formats.thumbnail.url}`}
                alt="عکس محصولات"
                width={600}
                height={600}
                className="cursor-pointer mb-4  rounded-sm mx-2  w-fit"
                onClick={() => handleClick(image.attributes.url, index)}
              />
            ))}
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="relative bg-white p-4 rounded-md w-full max-w-xl"
          >
            <Button
              onClick={handleCloseModal}
              className="absolute top-2 right-2   px-4 py-4 text-white bg-red-torob size-7"
            >
              &times;
            </Button>
            <div className="flex items-center justify-center">
              <Button onClick={prevImage} className=" bg-red-torob px-4   mx-2">
                <ChevronRight size={17} />
              </Button>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_API}${mainImage}`}
                alt=""
                width={800}
                height={600}
                className="mb-4 p-1"
              />
              <Button onClick={nextImage} className=" bg-red-torob px-4  mx-2">
                <ChevronLeft size={17} />
              </Button>
            </div>
            <div className="flex justify-center mt-4 overflow-x-auto">
              {images.map((image, index) => (
                <Image
                  key={image.id}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL_API}${image.attributes.formats.thumbnail.url}`}
                  alt=""
                  width={100}
                  height={100}
                  className={`cursor-pointer mx-1 border rounded-sm p-1 ${
                    currentIndex === index ? "border-blue-500" : ""
                  }`}
                  onClick={() => handleClick(image.attributes.url, index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
