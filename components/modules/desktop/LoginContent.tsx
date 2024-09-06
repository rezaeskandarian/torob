"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/service/auth";

import Link from "next/link";

import { useState } from "react";
import { ClipLoader } from "react-spinners";

export function LoginContent({
  isOpen,
  onClose,
  onSwitch,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      setError("لطفا ایمیل و پسورد خود را به درستی وارد کنید");
      return;
    } else {
      setError("");
    }
    setIsLoading(true);
    try {
      const res = await loginUser(email, password);
      if (res && res.jwt) {
        setError("");
        onClose();
      } else if (res?.error && res?.error.status === 400) {
        setError("ایمیل و یا پسورد خود را اشتباه وارد کردید دوباره تلاش کنید");
      } else {
        setError("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
      }
    } catch (error) {
      setError("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="sm:max-w-[425px] pt-6"
          aria-describedby={undefined}
        >
          <form onSubmit={handleLogin}>
            <DialogHeader>
              <DialogTitle className="text-center text-lg">
                ورود به حساب کاربری
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right text-sm">
                  ایمیل
                </label>
                <Input
                  id="email"
                  placeholder="ایمیل"
                  className="col-span-3"
                  type="email"
                  name="identifier"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="password" className="text-right text-sm">
                  پسورد
                </label>
                <Input
                  id="username"
                  placeholder="پسورد"
                  className="col-span-3"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>
            <p className="text-xs">
              ثبت نام در ترب به معنی موافقت با
              <Link href={"/pages/terms"} className="text-xs text-blue-700">
                {" "}
                شرایط استفاده از ترب
              </Link>{" "}
              است
            </p>
            {error && <p className="text-xs py-3 text-red-700">{error}</p>}

            <DialogFooter className="pt-2">
              <Button variant={"link"} onClick={onSwitch} className="text-xs">
                {" "}
                .حساب کاربری جدید می سازم
              </Button>

              <Button
                className="bg-red-torob text-xs"
                type="submit"
                disabled={isLoading}
              >
                ورود
                {isLoading && <ClipLoader size={20} color={"#ffffff"} />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
