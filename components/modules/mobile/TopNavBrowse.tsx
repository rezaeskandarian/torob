"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const TopNavBrowse = ({ title }: { title: string }) => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(true); // Track whether the search bar is visible
  const [lastScrollY, setLastScrollY] = useState(0); // Track the last scroll position

  const backHandler = () => {
    router.back();
  };

  // Function to handle scrolling behavior
  const controlSearchBar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // If the user scrolls down, hide the search bar
        setShowSearch(false);
      } else {
        // If the user scrolls up, show the search bar
        setShowSearch(true);
      }
      setLastScrollY(window.scrollY); // Update the last scroll position
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlSearchBar);
      return () => {
        window.removeEventListener("scroll", controlSearchBar);
      };
    }
  }, [lastScrollY ]);

  return (
    <>
      <div className="bg-white">
        <div className="flex items-center bg-white fixed top-0 z-20 w-full py-3 border-b">
          <ArrowRight className="mx-3" size={22} onClick={backHandler} />
          <p>{title}</p>
        </div>

        {/* Search bar with a smooth transition effect */}
        <div
          className={`bg-white py-2 px-4 mb-3 fixed w-full transition-transform duration-300 z-10 ${
            showSearch ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ top: "49px" }} // Fixed position below the title bar
        >
          <div className="bg-medium-gray flex items-center rounded-sm">
            <Input
              placeholder={`جستجو در ${title}`}
              className="border-none size-full focus:outline-none focus:ring-0 focus:border-transparent bg-medium-gray"
            />
            <Search className="text-gray-400 mx-3" size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavBrowse;
