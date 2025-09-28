"use client";
import React from "react";
import Image from "next/image";
import shehta1 from "../../../public/images/shehta1.png";
import shehta2 from "../../../public/images/shehta2.png";
import shehta3 from "../../../public/images/shehta3.png";
import shehta4 from "../../../public/images/shehta4.png";
import shehta5 from "../../../public/images/shehta5.png";
import shehta6 from "../../../public/images/shehta6.png";
import shehta7 from "../../../public/images/shehta7.png";
import shehta8 from "../../../public/images/shehta8.png";
import shehta9 from "../../../public/images/shehta9.png";

import EmblaCarouselSlider from "../emblaCarouselSlider/EmblaCarouselSlider";
import "../emblaCarouselSlider/emblaCarouselSlider.css";

import "../emblaCarousel/emblaCarousel.css";
// نفس اللي بتستخدمه في HomeAbout
import { Button } from "../ui/Button";
import whats from "@/public/images/whatsapp.svg";
import phone from "@/public/images/phonenumber.svg";
import EmblaCarousel from "../emblaCarousel/EmblaCarousel";
import Link from "next/link";

const HomeCars = () => {
  const carsData = [
    {
      id: 1,
      images: [shehta1, shehta2, shehta3],
      brand: "تويوتا",
      model: "كامري",
      year: 2022,
      kilometers: 15000,
      condition: "جيدة جداً",
      description:
        "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام هنا يوجد محتوى",
    },
    {
      id: 2,
      images: [shehta4, shehta5],
      brand: "هيونداي",
      model: "سوناتا",
      year: 2021,
      kilometers: 25000,
      condition: "ممتازة",
      description: "كاملة المواصفات، فتحة سقف، رادار خلفي",
    },
    {
      id: 3,
      images: [shehta6, shehta7, shehta8],
      brand: "كيا",
      model: "سبورتاج",
      year: 2020,
      kilometers: 40000,
      condition: "جيدة",
      description: "دفع رباعي، جير أوتوماتيك، تكييف ثنائي المناطق",
    },
    {
      id: 4,
      images: [shehta9],
      brand: "مرسيدس",
      model: "فئة C",
      year: 2019,
      kilometers: 60000,
      condition: "جيدة جداً",
      description: "فاخرة، ملونة، مثبت سرعة، كاميرا خلفية",
    },
    {
      id: 5,
      images: [shehta9],
      brand: "مرسيدس",
      model: "فئة C",
      year: 2019,
      kilometers: 60000,
      condition: "جيدة جداً",
      description: "فاخرة، ملونة، مثبت سرعة، كاميرا خلفية",
    },
    {
      id: 6,
      images: [shehta9],
      brand: "مرسيدس",
      model: "فئة C",
      year: 2019,
      kilometers: 60000,
      condition: "جيدة جداً",
      description: "فاخرة، ملونة، مثبت سرعة، كاميرا خلفية",
    },
  ];

  const OPTIONS = {
    loop: true,
    duration: 20,
  };

  const aboutSlides = carsData.map((car) => {
    const carSlides = car.images.map((img, index) => (
      <div key={index} className="slider-slide object-cover">
        <Image
          src={img}
          alt={`${car.brand} ${car.model}`}
          className="object-cover w-full h-full rounded-[26px]"
        />
      </div>
    ));

    return (
      <div
        key={car.id}
        className="embla__slide p-[18px] bg-white rounded-[26px] overflow-hidden shadow-lg flex flex-col"
      >
        {/* سلايدر صور السيارة */}
        <EmblaCarouselSlider slides={carSlides} options={{ loop: true }} />

        {/* تفاصيل السيارة */}
        <div className="w flex flex-col gap-2 mt-[2vh] w-full  aspect-video ">
          <h3 className="text-black font-semibold text-center text-[6vw] md:text-[1.5vw] ">
            {car.model}
          </h3>
          <div className="flex justify-between ">
            <h1 className="text-black text-[4vw] md:text-[1vw]  font-semibold">
              {car.brand}
            </h1>
            <div className="flex gap-4">
              <span className="text-black text-[4vw] md:text-[1vw] font-semibold">
                {car.kilometers.toLocaleString()} KM
              </span>
              <span className="text-black text-[4vw] md:text-[1vw]  font-semibold">
                {car.year}
              </span>
            </div>
          </div>
          <p
            style={{ direction: "rtl" }}
            className="text-black text-justify text-[4vw] md:text-[1.5vw] lg:text-[1vw]  font-medium line-clamp-4 "
          >
            {car.description}
          </p>
        </div>
        <div className="flex flex-row justify-between gap-2 items-center  w-full">
          <Image width={40} height={40} src={whats} alt="whatsapp" />
          <Image width={40} height={40} src={phone} alt="phone" />
          <button className="bg-[#E6E6E6]  font-bold text-black rounded-[42.5px] w-[50%] h-[32px] text-[4vw] md:text-[1.5vw]  p-1">
            {car.condition}
          </button>
          <button className="bg-[#FDB800]  font-bold text-black rounded-[42.5px] w-[50%] h-[32px] text-[4vw] md:text-[1.5vw]   p-1">
            قراءة المزيد
          </button>
        </div>
      </div>
    );
  });

  return (
    <div
      className="bg-[#FDB800] w-screen  flex flex-col items-center justify-around py-8 gap-4"
      style={{ direction: "rtl" }}
    >
      <h1 className="px-[8%] text-[6vw] md:text-[2vw] font-bold w-full text-center md:text-right text-gray-900">
        المعروضــات ✨
      </h1>
      <div className="w-full relative flex items-center justify-center  ">
        <EmblaCarousel slides={aboutSlides} options={OPTIONS} />
      </div>
      <Link className="w-full flex justify-center" href="/allcars">
        <Button kind="secondarySpecial">عرض الكل</Button>
      </Link>
    </div>
  );
};

export default HomeCars;
