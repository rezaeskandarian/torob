"use client";

import CustomInputSearch from "@/components/ui/CustomInputSearch";
import torobLogo from "@/public/torob_logo.svg";
import Image from "next/image";

import saleTara from "@/public/image-mobile/tar_job2x_dbbe6hx.jpg";
import map from "@/public/image-mobile/map_job2x_b8p56na.jpg";
import torobHologram from "@/public/image-mobile/torob_hologram_job.png";
import pride from "@/public/image-mobile/2 (1).jpg";
import peju from "@/public/image-mobile/3.jpg";
import keyOfCar from "@/public/image-mobile/1 (1).jpg";
import babySitter from "@/public/image-mobile/11.jpg";
import shoes from "@/public/image-mobile/12.jpg";
import kitchen from "@/public/image-mobile/10 (1).jpg";
import apple from "@/public/image-mobile/2 (2).jpg";
import samsung from "@/public/image-mobile/1 (2).jpg";
import nokia from "@/public/image-mobile/5.jpg";
import huavi from "@/public/image-mobile/4.jpg";
import shiaomi from "@/public/image-mobile/3 (1).jpg";
import khodroDetail from "@/public/image-mobile/9.jpg";
import beuty from "@/public/image-mobile/8.jpg";
import ps5 from "@/public/image-mobile/2.jpg";
import xbox from "@/public/image-mobile/1.jpg";
import foodAnimal from "@/public/image-mobile/10.jpg";
import animalDetail from "@/public/image-mobile/9 (1).jpg";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
  }>;
  prompt(): Promise<void>;
}

const HomePageMobile = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      const beforeInstallPromptEvent = e as BeforeInstallPromptEvent;
      beforeInstallPromptEvent.preventDefault();
      setDeferredPrompt(beforeInstallPromptEvent);
      console.log('Deferred prompt set:', beforeInstallPromptEvent);
    };
  
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.update();
        }
      });
    }
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered', reg))
        .catch(() => console.log('Service Worker registration failed'));
    }
  
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);
  
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };
  
  const promptAppInstall = async () => {
    if (isIos()) {
      alert('iOS devices do not support the install prompt.');
    } else {
      if (deferredPrompt) {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      } else {
        alert('You have already installed the app or the install prompt is not available.');
      }
    }
  };



  return (
    <div className="w-full">
      <div className="  mt-16">
        <Image
          src={torobLogo}
          width={80}
          height={80}
          alt="ترب"
          className="mx-auto"
        />
      </div>
      <div className="w-full px-4 mt-7 sticky top-0 py-3  bg-white">
        <CustomInputSearch button={false} mobileStyle={true} />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 font-bold text-center mt-7">
          بیشترین جستجوی کاربران
        </p>

        <div className="flex flex-wrap   mx-2 mt-6 mb-14 text-center">
          <p className="flex-grow flex-basis-0 mx-1  bg-[#D73948] text-white px-4 py-2 my-1 rounded-xl">
            لیوان
          </p>
          <p className="flex-grow flex-basis-0 mx-1 bg-[#C6445B] text-white px-4 py-2 my-1 rounded-xl">
            پنکه شارژی
          </p>
          <p className="flex-grow flex-basis-0 mx-1 bg-[#B64D6C] text-white px-4 py-2 my-1 rounded-xl">
            چراغ شارژی
          </p>
          <p className="flex-grow flex-basis-0 mx-1 bg-[#A8567B] text-white px-4 py-2 my-1 rounded-xl">
            چادر مشکی
          </p>
          <p className="flex-grow flex-basis-0 mx-1 bg-[#995F8C] text-white px-4 py-2 my-1 rounded-xl">
            موتور برق بنزینی
          </p>
          <p className="flex-grow flex-basis-0 mx-1 bg-[#89699D] text-white px-4 py-2 my-1 rounded-xl">
            تخت
          </p>
          <p className="flex-grow flex-basis-0 mx-1 bg-[#7B71AC] text-white px-4 py-2 my-1 rounded-xl">
            استخر
          </p>
          <p className="flex-grow flex-basis-0 mx-1 bg-[#6B7CBE] text-white px-4 py-2 my-1 rounded-xl">
            چراغ خواب
          </p>
          <p className="flex-grow flex-basis-0 mx-1 bg-[#5C84CE] text-white px-4 py-2 my-1 rounded-xl">
            پنل خورشیدی
          </p>
          <p className="flex-grow flex-basis-0 mx-1  bg-[#4A90E2] text-white px-4 py-2 my-1 rounded-xl">
            تشک بادی
          </p>
          <p className="flex-grow flex-basis-0 mx-1 bg-[#4A90E2] text-white px-4 py-2 my-1 rounded-xl">
            a13
          </p>
        </div>
      </div>
      <div className="bg-medium-gray py-5 px-1 w-full my-20 justify-between flex">
      <div className="bg-white w-full py-4">
        <span className="pr-1 text-sm w-full">
          میخواهید ترب را روی گوشی خود نصب کنید ؟
        </span>
        <div className="mt-3 mr-1">
          <Button className="bg-red-torob rounded-md mx-2 my-2" onClick={promptAppInstall} >
            بله نصب شود
          </Button>
          <Button className="text-red-torob border-red-torob my-2" variant={"outline"}>
            خیر
          </Button>
        </div>
      </div>
      <div className="bg-white">
        <Image
          src={torobLogo}
          width={70}
          height={70}
          alt="ترب"
          className="mx-7 border rounded-sm p-1 my-5"
        />
      </div>
    </div>
      <div className="bg-white p-2  mt-4">
        <div className="flex ">
          <div className="w-[47%] mx-2">
            <Image
              src={saleTara}
              alt="tara"
              className="w-full "
              quality={100}
            />
          </div>
          <div className="w-[60%] mx-2">
            <Image
              src={map}
              alt="خرید حضوری"
              className="w-full"
              quality={100}
            />
          </div>
        </div>
        <div className="w-full mt-5">
          <Image
            src={torobHologram}
            className="w-full"
            alt="گارانتی ترب"
            quality={100}
          />
        </div>
      </div>
      <div className="bg-medium-gray mt-3">
        <div className="flex">
          <div className="ml-1 mr-3 w-full ">
            <Image
              src={pride}
              className="w-full pb-2 rounded-lg"
              alt="خودرو"
              quality={100}
            />
            <Image
              src={peju}
              className="w-full pt-2  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
          <div className=" mr-1 ml-3 w-full">
            <Image
              src={keyOfCar}
              className="w-full  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="ml-1 mr-3 w-full ">
            <Image
              src={babySitter}
              className="w-full pb-2  rounded-lg"
              alt="خودرو"
              quality={100}
            />
            <Image
              src={shoes}
              className="w-full pt-2  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
          <div className=" mr-1 ml-3 w-full">
            <Image
              src={kitchen}
              className="w-full  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="ml-1 mr-3 w-full ">
            <Image
              src={apple}
              className="w-full pb-2  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
          <div className=" mr-1 ml-3 w-full">
            <Image
              src={samsung}
              className="w-full  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="ml-1 mr-3 w-full ">
            <Image
              src={nokia}
              className="w-full pb-2  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
          <div className=" mx-1 w-full">
            <Image
              src={huavi}
              className="w-full  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>

          <div className=" mr-1 ml-3 w-full">
            <Image
              src={shiaomi}
              className="w-full  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="ml-1 mr-3 w-full ">
            <Image
              src={khodroDetail}
              className="w-full pb-2  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
          <div className="mr-1 ml-3 w-full">
            <Image
              src={beuty}
              className="w-full  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="ml-1 mr-3 w-full ">
            <Image
              src={ps5}
              className="w-full pb-2  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
          <div className="mr-1 ml-3 w-full">
            <Image
              src={xbox}
              className="w-full  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
        </div>

        <div className="flex mt-2 mb-12">
          <div className="ml-1 mr-3 w-full ">
            <Image
              src={foodAnimal}
              className="w-full pb-2  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
          <div className="mr-1 ml-3 w-full">
            <Image
              src={animalDetail}
              className="w-full  rounded-lg"
              alt="خودرو"
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageMobile;
