"use client";
import { e2p, sp } from "@/lib/numbers";
import { Bell, Heart, MapPin } from "lucide-react";
import ImageGalleryProductCard from "./ImageGalleryProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addParam,
  addSearch,
  fetchProduct,
  fetchIdCategory,
  setFilter,
  setId,
  setPage,
  removeId,
} from "@/redux/features/product/productSlice";
import { AppDispatch } from "@/redux/store";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import Link from "next/link";

type ProductCardProps = {
  paramsId: string;
  QSearch: string;
};

const ProductCard = ({ paramsId, QSearch }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const { products, error, loading, categoryId } = useSelector(
    (state: any) => state.products
  );

  useEffect(() => {
    if (pathname.includes("/browse/main")) {
      dispatch(setPage("main"));
      dispatch(setId({ key: "mainId", value: paramsId }));
      dispatch(removeId(categoryId.midId));
      dispatch(removeId(categoryId.subId));
    }
    if (pathname.includes("/browse/mid")) {
      dispatch(setPage("mid"));
      dispatch(setId({ key: "midId", value: paramsId }));
      dispatch(removeId(categoryId.subId));
    }
    if (pathname.includes("/browse/sub")) {
      dispatch(setPage("sub"));

      dispatch(setId({ key: "subId", value: paramsId }));
    }
    if (pathname.includes("/search")) {
      dispatch(setPage("search"));
    }
    if (paramsId) {
      dispatch(addParam(paramsId));
    }
    if (QSearch) {
      dispatch(addSearch(QSearch));
      dispatch(setFilter({ key: "q", value: QSearch }));
    }
    dispatch(fetchIdCategory());
    dispatch(fetchProduct());
  }, [dispatch, paramsId, pathname, QSearch, categoryId]);

  if (loading) {
    return (
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-md p-2 flex flex-col justify-between"
          >
            <div>
              <Skeleton className="w-full h-40 py-1" />
            </div>
            <div className="my-1">
              <Skeleton className="w-full h-8 mb-2" />
              <Skeleton className="w-3/4 h-12" />
            </div>
            <div className="flex mt-2 mb-11">
              <Skeleton className="w-16 h-4 mr-2 py-1" />
              <Skeleton className="w-16 h-4 py-1" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="w-16 h-4 py-1" />
              <Skeleton className="w-16 h-4 py-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!loading && products?.data?.length === 0) {
    return (
      <p className="font-bold text-center text-sm py-3">گشتم نبود نگرد نیست</p>
    );
  }

  return (
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {products?.data?.map((product: any) => {
        const { name, stock_status, location, price, prices, image } =
          product.attributes;

        return (
          <div
            className="bg-white rounded-md p-2 flex flex-col justify-between"
            key={product.id}
          >
            <div>
              <ImageGalleryProductCard image={image} />
            </div>
            <Link href={`/p/${product.id}`} key={product.id}>
              <div>
                <p className="text-sm line-clamp-3 font-bold">{name}</p>
              </div>
              {/* Location and Stock Status */}
              <div className="flex mt-2 mb-11">
                {location && (
                  <div className="flex items-center bg-medium-gray w-fit rounded-sm py-1 px-[4px] ml-1">
                    <MapPin
                      size={16}
                      className="text-white mx-1"
                      fill="#3468CC"
                    />
                    <span className="text-xs">{location}</span>
                  </div>
                )}

                {stock_status === "stock" && (
                  <div className="flex items-center bg-medium-gray w-fit rounded-sm py-1 px-[4px] ml-1">
                    <span className="text-xs">کارکرده</span>
                  </div>
                )}
              </div>

              {/* Price and Store Information */}
              <div className="mt-auto">
                <p className="text-sm font-bold py-1">از {sp(price)} تومان</p>

                <div className="flex items-center justify-between my-2">
                  <div className="text-xs text-gray-600 font-semibold">
                    در {e2p(prices.data.length)} فروشگاه
                  </div>
                  <div className="flex">
                    <Heart
                      size={16}
                      className="text-gray-600 mx-1 cursor-pointer"
                    />
                    <Bell
                      size={16}
                      className="text-gray-600 mx-1 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
