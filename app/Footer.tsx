import React from "react";
import logo from "../public/images/shehtalogo.png";
import Image from "next/image";
import phone from "../public/images/phonenumber.svg";
import whatsapp from "../public/images/whatsapp.svg";
import youtube from "../public/images/youtube.svg";
import instagram from "../public/images/instagram.svg";
import tiktok from "../public/images/tiktok.svg";
import facebook from "../public/images/facebook.svg";
import { Button } from "antd";

const Footer = () => {
  return (
    <div id="contact"
      className="bg-[#282828] text-black px-[8%] md:px-[6%] py-[8%] md:py-[2%] w-full flex flex-col lg:flex-row items-center justify-between gap-6"
      style={{ direction: "rtl" }}
    >
      {/**right part of footer */}
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-2">
          <Image
            src={logo}
            alt="shehtatrading logo شحتة للتجاره"
            width={80} // Add appropriate width
            height={80} // Add appropriate height
            className="object-contain"
          />
          <h1 className="font-bold text-white text-md">شحتة للتجارة</h1>
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-white font-bold text-md">تواصل معنا</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <Image
                src={phone}
                alt="shehta trading number رقم شحتة للتجاره"
                width={24}
                height={24}
              />
              <h1 className="text-white font-bold underline text-md">
                201003060607+
              </h1>
            </div>
            <div className="flex flex-row gap-4">
              <Image
                src={whatsapp}
                alt="رقم واتساب شحتة للتجاره shehta trading whatsapp"
                width={24}
                height={24}
              />
              <h1 className="font-bold text-white text-md">
                واتـــــســــــاب
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/**second part of footer */}
      <div className="flex flex-col justify-between gap-4">
        <h1 className="text-white text-center md:text-justify">
          العنوان :<br />
          <span className="font-medium">
            كورنيش بلطيم الجديد - بلطيم - كفر الشيخ - مصر.
          </span>
        </h1>
        <div className="flex justify-center w-full">
          <Button
            className="!bg-transparent !border-[1px] !border-white !rounded-[42px]"
            icon={
              <Image
                src="/images/maps.svg"
                width={12}
                height={12}
                alt="خرائط جوجل shehta trading location"
              />
            }
          >
            <span className="font-graphic text-white text-sm md:text-base">
              خرائط جوجل
            </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center md:items-start">
        <h1 className="font-bold text-white text-center md:text-justify">
          لمتابعة جديد المعروضات:
          <br />
          <span className="font-medium">
            تابعنا على مواقع التواصل الاجتماعى
          </span>
        </h1>
        <div className="flex flex-row gap-6">
          <Image
            src={youtube}
            width={35}
            height={35}
            alt="قناة يوتيوب شحتة للتجارة"
          />
          <Image
            src={instagram}
            width={35}
            height={35}
            alt="صفحة انستجرام شحتة للتجارة"
          />
          <Image
            src={facebook}
            width={35}
            height={35}
            alt="صفحة فيسبوك شحتة للتجارة"
          />
          <Image
            src={tiktok}
            width={35}
            height={35}
            alt="صفحة تيك توك شحتة للتجارة"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
