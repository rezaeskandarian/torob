import Breadcrump from "@/components/modules/desktop/Breadcrump";
import LineChart from "@/components/modules/desktop/ChartProduct";
import DescribeProduct from "@/components/modules/desktop/DescribeProduct";

import ImageGalleryProduct from "@/components/modules/desktop/ImageGallery";

import { detailProductProps } from "@/lib/types";
import SellerAttributes from "@/components/modules/desktop/SellerAttributes";
import { headers } from "next/headers";
import { isMobile } from "@/lib/isMobile";
import TopNavProduct from "@/components/modules/mobile/TopNavProduct";


const ProductPage = ({
  detailProduct: {
    id,
    attributes: { sub_category, name, image, keymain, keysub },
    meta,
  },
  seller,
}: detailProductProps) => {
  const sub_breadcrump = sub_category.data.attributes.name;
  const id_sub_breadcrump = sub_category.data.id;
  const mid_breadcrump =
    sub_category.data.attributes.mid_category.data.attributes.name;
  const main_breadcrump =
    sub_category.data.attributes.mid_category.data.attributes.main_category.data
      .attributes.name;

  const sortedPrices = seller.data.attributes.prices.data.sort(
    (a: any, b: any) => {
      return (
        Number(a.attributes.product_price_seller) -
        Number(b.attributes.product_price_seller)
      );
    }
  );

  console.log(sortedPrices);
  const userAgent = headers().get("user-agent") || "";

  const mobileCheck = isMobile(userAgent);
  return (
    <>
      {mobileCheck === true && <TopNavProduct name={name} />}
      <div className="bg-medium-gray">
        <div className={`mx-auto ${mobileCheck === false && "container"}`}>
          <Breadcrump
            sub={sub_breadcrump}
            mid={mid_breadcrump}
            main={main_breadcrump}
            idSub={id_sub_breadcrump}
          />
          <div className="grid grid-cols-6 gap-4">
            <div
              className={`bg-white rounded-sm col-span-6 ${
                mobileCheck === false &&
                "md:col-span-6 lg:col-span-6 xl:col-span-4 flex"
              } `}
            >
              <div className=" w-auto ">
                <ImageGalleryProduct images={image.data} mobile={mobileCheck} />
              </div>
              <div className={` ${mobileCheck === false ? "w-4/5" : "w-full"}`}>
                <DescribeProduct
                  name={name}
                  lowestPrice={sortedPrices}
                  mobile={mobileCheck}
                />
              </div>
            </div>
            <div
              className={`bg-white rounded-sm hidden xl:col-span-2  xl:block      `}
            >
              <LineChart />
            </div>

            <SellerAttributes
              keymain={keymain}
              keysub={keysub}
              seller={sortedPrices}
              mobile={mobileCheck}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
