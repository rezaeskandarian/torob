import Link from "next/link";

type SubMenuProps = {
  onLogout: () => void;
  isSubMenuOpen: boolean;
};

const SubMenu = ({ onLogout, isSubMenuOpen }: SubMenuProps) => {
  console.log(isSubMenuOpen);
  return (
    <>
   
        <ul className={`absolute bg-white w-auto text-center text-xs px-3 py-4 rounded top-13 left-5 z-50 ${isSubMenuOpen ? "block" : "hidden"} `}>
          <li className="py-1">
            <Link href={"/"}>تغییرات قیمت</Link>
          </li>
          <li className="py-1">
            <Link href={"/"}>محبوب ها</Link>
          </li>
          <li className="py-1">
            <Link href={"/"}>مشاهدات اخیر</Link>
          </li>
          <li className="py-1">
            <Link href={"/"}>گزارش های من</Link>
          </li>
          <li className="py-1">
            <Link href={"/"}>پیگیری های من</Link>
          </li>
          <li className="py-1">
            <Link href={"/"}>شهر من</Link>
          </li>
          <li className="py-1">
            <button className="text-red-600" onClick={onLogout}>
              خروج
            </button>
          </li>
        </ul>

    </>
  );
};

export default SubMenu;