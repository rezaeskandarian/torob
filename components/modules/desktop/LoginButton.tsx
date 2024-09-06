"use client";
import { Button } from "@/components/ui/button";
import { LoginContent } from "./LoginContent";
import { useEffect, useState, useRef } from "react";
import { RegisterContent } from "./RegisterContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { checkUser, logout } from "@/redux/features/auth/checkUserSlice";
import SubMenu from "./SubMenu";
import { deleteCookie } from "@/lib/cookies";

const LoginButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);
  const [view, setView] = useState<string>("login");
  const subMenuRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    dispatch(checkUser()); // Re-fetch user data when modal is closed
  };
  const handleLogOut = () => {
    dispatch(logout());
    deleteCookie("token");
  };

  const toggleView = () => setView(view === "login" ? "register" : "login");
  const handleOpenSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (subMenuRef.current && !subMenuRef.current.contains(event.target as Node)) {
      setIsSubMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isSubMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSubMenuOpen]);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <>
      {user ? (
        <div className="relative" ref={subMenuRef}>
          <Button
            className="bg-white text-slate-600 border hover:bg-light-gray text-xs my-2 mx-5"
            onClick={handleOpenSubMenu}
          >
            <div className="">{user.email}</div>
          </Button>
          <SubMenu onLogout={handleLogOut} isSubMenuOpen={isSubMenuOpen} />
        </div>
      ) : (
        <>
          <Button
            className="bg-white text-slate-600 border hover:bg-light-gray text-xs my-2 mx-5"
            onClick={handleOpen}
          >
            ورود / ثبت نام
          </Button>
          {view === "login" ? (
            <LoginContent
              isOpen={isModalOpen}
              onClose={handleClose}
              onSwitch={toggleView}
            />
          ) : (
            <RegisterContent
              isOpen={isModalOpen}
              onClose={handleClose}
              onSwitch={toggleView}
            />
          )}
        </>
      )}
    </>
  );
};

export default LoginButton;
