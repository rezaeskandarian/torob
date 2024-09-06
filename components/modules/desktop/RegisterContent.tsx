import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/service/auth";
import Link from "next/link";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export function RegisterContent({
  isOpen,
  onClose,
  onSwitch,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
}) {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const registerHandler = async (e: any) => {
    e.preventDefault();
    if (!email || !password || !username) {
      setError("لطفا ایمیل و پسورد و نام کاربری خود را به درستی وارد کنید");
      return;
    } else {
      setError("");
    }
    setIsLoading(true);
    try {
      const res = await registerUser(email, password, username);
      if (res && res.jwt) {
        setError("");
        onClose();
      } else if (res?.error && res?.error.status === 400) {
        setError(
          "این ایمیل و نام کاربری در سیستم موجود است لطفا ایمیل و نام کاربری دیگری وارد کنید"
        );
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
        <DialogContent className="sm:max-w-[425px] pt-6">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              ساخت حساب کاربری
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={registerHandler}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="password" className="text-right text-sm">
                  نام کاربری
                </label>
                <Input
                  id="username"
                  placeholder="نام کاربری"
                  className="col-span-3"
                  type="string"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="password" className="text-right text-sm">
                  پسورد
                </label>
                <Input
                  id="password"
                  placeholder="گذرواژه"
                  className="col-span-3"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                قبلا در ترب حساب کاربری داشتم
              </Button>
              <Button className="bg-red-torob text-xs" type="submit">
                ساخت حساب کاربری{" "}
                {isLoading && <ClipLoader size={20} color={"#ffffff"} />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
