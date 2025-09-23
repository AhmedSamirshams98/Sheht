"use client";
import React, { useEffect, useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // التحقق أول مرة
    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  return (
    <div
      className="fixed text-white z-[100] backdrop-blur-md  px-[6%] py-[2%] w-full  "
      style={{ direction: "rtl" }}
    >
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </div>
  );
};

export default Nav;
