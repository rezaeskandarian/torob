import LoginButton from "@/components/modules/desktop/LoginButton";
import MainMenu from "@/components/modules/desktop/MainMenu";
import CustomInputSearch from "@/components/ui/CustomInputSearch";

import { buttomMainPageLeft, buttomMainPageRight } from "@/constants/strings";
import { getCategory } from "@/service/getCategory";

import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
  const dataAllCategory = await getCategory();
  console.log(dataAllCategory);
  return (
    <>
      <div className="  w-full  group ">
        <div className=" bg-light-gray flex justify-between items-center w-full sticky top-0 ">
          <MainMenu data={dataAllCategory} />
          <LoginButton />
        </div>
        <div className="bg-medium-gray   h-[850px]  grid grid-cols-1 overflow-hidden  ">
          <div className=" w-fit mx-auto size-auto mt-48  ">
            <Image
              src={"../torob_logo.svg"}
              width={89}
              height={89}
              alt="torob logo"
              className="mx-auto"
              priority
            />
            <p className="text-4xl  mt-4  font-bold mb-6 text-center text-red-600 ">
              ترب
            </p>
            <div className="mx-2 w-96">
              <CustomInputSearch button={false} mobileStyle={false} />
            </div>

            <p className="text-sm text-slate-700 mt-6 text-center ">
              مقایسه قیمت میلیون ها محصول بین هزاران فروشگاه
            </p>
          </div>
        </div>
        <div className="fixed grid bg-light-gray  bottom-0   md:grid-cols-1 lg:grid-cols-2  justify-items-center  w-full">
          <div className="grid grid-flow-col w-fit mt-2 mx-auto justify-between">
            {buttomMainPageRight.map((i) => (
              <>
                <Link
                  href={i.href}
                  key={i.text}
                  className="md:text-[15px]  text-[12px] text-slate-500 text-right md:pl-3 px-2"
                >
                  {i.text}
                </Link>
              </>
            ))}
          </div>
          <div className="grid grid-flow-col w-fit my-2">
            {buttomMainPageLeft.map((i) => (
              <>
                <Link
                  href={i.href}
                  key={i.text}
                  className="md:text-[15px] xs:text-[13px]  text-[12px] lg:text-[13px] xl:text-[16px] text-slate-500 text-right md:pl-3 px-2 "
                >
                  {i.text}
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
