import LoginButton from "@/components/modules/desktop/LoginButton";
import MainMenu from "@/components/modules/desktop/MainMenu";

import Image from "next/image";

import CustomInputSearch from "@/components/ui/CustomInputSearch";
import { getCategory } from "@/service/getCategory";

const MainHeader = async () => {
  const dataAllCategory = await getCategory();
  return (
    <div className="block bg-light-gray">
      <div className="pr-10 flex justify-between p-7">
        <div className="flex items-center space-x-4">
          <Image
            src={"/torob_logo.svg"}
            alt="torob-logo"
            width={54}
            height={54}
            priority
          />
          <p className="text-3xl   text-red-600 pr-4 font-bold">ترب</p>
          <div className=" w-96">
            <CustomInputSearch button={true} mobileStyle={false} />
            
          </div>
        </div>
        <div>
          <LoginButton />
        </div>
      </div>
      <div className="py-3">
        <MainMenu data={dataAllCategory} />
      </div>
    </div>
  );
};

export default MainHeader;
