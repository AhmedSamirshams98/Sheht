import React from "react";
import backgroundimage from "../../public/images/backgroundimage.png";
import Image from "next/image";
import "../globals.css";
import { Button } from "./ui/Button";
import Link from "next/link";

const HomeFirst = () => {
  return (
    <div className="w-screen  relative    " style={{ direction: "rtl" }}>
      <Image
        className="w-full  object-cover max-h-[100vh]"
        src={backgroundimage}
        alt="shehtatradingcars"
      />
      <div className="flex flex-col   gap-4 md:gap-6 text-white text-right absolute top-[26%] md:top-[16%] right-[7%]">
        <h1 className="text-[5vw] md:text-[4vw]">
          سيـارة أحـلامـك!
          <br /> لحد باب البيت
        </h1>
        <Link href="/form">
          <Button kind="primary">اطلب سيارتك الآن!</Button>
        </Link>{" "}
      </div>
    </div>
  );
};

export default HomeFirst;
