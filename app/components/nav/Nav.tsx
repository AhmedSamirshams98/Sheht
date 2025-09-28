"use client";
import React, { useEffect, useRef, useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import backgroundimage from "../../../public/images/backgroundimage.png";
import { usePathname } from "next/navigation";

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    

    const updateNavHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
        // نضيف padding-top على main
        const main = document.querySelector("main");
        if (main) {
          main.style.paddingTop = pathname === "/" ? "0px" : `${navHeight}px`;
        }
      }
    };

    checkIsMobile();
    updateNavHeight();

    window.addEventListener("resize", checkIsMobile);
    window.addEventListener("resize", updateNavHeight);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
      window.removeEventListener("resize", updateNavHeight);
    };
  }, [navHeight, pathname]);

  const isHome = pathname === "/";

  return (
    <div
      ref={navRef}
      className='fixed top-0 left-0 text-white z-[100] px-[6%] py-[2%] w-full transition-all duration-300 '
       

      style={{
        direction: "rtl",
        backgroundImage: !isHome ? `url(${backgroundimage.src})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </div>
  );
};

export default Nav;
