import Link from "next/link";
import Image from "next/image";

import {
  MainFooterDashboardColOne,
  MainFooterDashboardColTwo,
} from "@/constants/strings";

import enamad from "@/public/enamad.png";
import samandehi from "@/public/samandehi.png";
import etehadiye from "@/public/etehadiye.png";

const MainFooter = () => {
  return (
    <>
      <div className="bg-light-gray text-slate-700 text-sm  flex justify-between border-b-2">
        <div className="flex py-10 text-slate-700">
          <div className="px-20">
            {MainFooterDashboardColOne.map((i) => (
              <div key={i.text} className="py-2">
                <Link href={i.href}>{i.text}</Link>
              </div>
            ))}
          </div>
          <div className="px-20 ">
            {MainFooterDashboardColTwo.map((i) => (
              <div key={i.text} className="py-2">
                <Link href={i.href}>{i.text}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex p-9">
          <div className="bg-white rounded p-2 mx-2">
            <Image src={enamad} width={125} height={125} alt="enamad-torob" />
          </div>
          <div className="bg-white rounded p-2 mx-2">
            <Image
              src={samandehi}
              width={125}
              height={125}
              alt="samandehi-torob"
            />
          </div>
          <div className="bg-white rounded p-2 mx-2">
            <Image
              src={etehadiye}
              width={125}
              height={125}
              alt="etehadiye-torob"
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div><p>ترب موتور جستجوی هوشمند خرید </p></div>
        <div></div>
            
      </div>
    </>
  );
};

export default MainFooter;
