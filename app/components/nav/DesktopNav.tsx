import React from "react";
import shehtalogo from "../../../public/images/shehtalogo.png";
import Image from "next/image";
import { navLinks } from "@/data/constants";
import Link from "next/link";

const DesktopNav = () => {
  return (
    <div className="flex flex-row   w-[78%]  " style={{ direction: "rtl" }}>
      {/**nav right part  */}

      {/**nav left part */}
      <div className="w-full flex flex-row items-center p-[1%] justify-between rounded-[42px] bg-gradient-to-r from-[#3B260680] to-[#3B260680]/50 text-[1.2vw] lg:text-[1vw]">
        <Link href="/">
          <div className="flex flex-row items-center  gap-4">
            <Image
              width={35}
              height={35}
              src={shehtalogo}
              alt="shehtatraidingcars شحتة للتجارة"
            />
            <h3 className="font-bold text-[1.5vw] ">شحتة للتجارة</h3>
          </div>
        </Link>
        {navLinks.map((link, path) => (
          <Link key={link.id} href={link.path} scroll={true}>
            <h1 className="text-[1vw]" key={path}>
              {link.name}
            </h1>
          </Link>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default DesktopNav;
