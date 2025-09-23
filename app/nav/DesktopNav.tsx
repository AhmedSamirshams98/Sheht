import React from "react";
import shehtalogo from "../../public/images/shehtalogo.png";
import Image from "next/image";
import { navLinks } from "@/data/constants";
import Link from "next/link";

const DesktopNav = () => {
  return (
    <div
      className="flex flex-row   w-[78%] justify-between"
      style={{ direction: "rtl" }}
    >
      {/**nav right part  */}
      <Link href="/">
        <div className="flex flex-row items-center gap-4">
          <Image
            className="w-[4vw]"
            src={shehtalogo}
            alt="shehtatraidingcars شحتة للتجارة"
          />
          <h1 className="font-bold text-[1.2vw]">شحتة للتجارة</h1>
        </div>
      </Link>
      {/**nav left part */}
      <div className="w-[42vw] flex flex-row items-center justify-around rounded-[42px] bg-gradient-to-r from-[#3B260680] to-[#3B260680]/50 text-[1.2vw] lg:text-[1vw]">
        {navLinks.map((link, path) => (
          <Link key={link.id} href={link.path} scroll={true}>
            <h1 key={path}>{link.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopNav;
