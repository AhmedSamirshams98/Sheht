"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import EmblaCarouselSlider from "../emblaCarouselSlider/EmblaCarouselSlider";
import "../emblaCarouselSlider/emblaCarouselSlider.css";
import "../emblaCarousel/emblaCarousel.css";
import whats from "@/public/images/whatsapp.svg";
import phone from "@/public/images/phonenumber.svg";
import EmblaCarousel from "../emblaCarousel/EmblaCarousel";
import Link from "next/link";
import { useCarStore } from "@/stores/carStore";
import { usePathname } from "next/navigation";

interface HomeCarsProps {
  isDashboard?: boolean;
}

const HomeCars = ({ isDashboard = false }: HomeCarsProps) => {
  const { cars, fetchCars } = useCarStore();
  const pathname = usePathname();

  useEffect(() => {
    if (cars.length === 0) {
      fetchCars();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCars]);
  // التحقق إذا كنا في الصفحة الرئيسية أو في الداشبورد
  const isHomePage = pathname === "/" && !isDashboard;

  const OPTIONS = {
    loop: true,
    duration: 20,
  };

  const aboutSlides = cars.map((car) => {
    const carSlides = car.images.map((img, index) => (
      <div key={index} className="slider-slide object-cover">
        <Image
          src={img}
          fill
          alt={`${car.brand} ${car.model}`}
          className="object-cover w-full aspect-square rounded-[26px]"
        />
      </div>
    ));

    return (
      <div
        key={car.id}
        className="embla__slide p-[14px] bg-white rounded-[26px] overflow-hidden shadow-lg flex flex-col"
      >
        {/* سلايدر صور السيارة */}
        <EmblaCarouselSlider slides={carSlides} options={{ loop: true }} />

        {/* تفاصيل السيارة */}
        <div className="w flex flex-col gap-2 mt-[2vh] w-full aspect-video">
          <h3 className="text-black font-semibold text-center text-[4vw] lg:text-[1.4vw]">
            {car.model}
          </h3>
          <div className="flex justify-between">
            <h1 className="text-black text-[3vw] lg:text-[1vw] font-medium">
              {car.brand}
            </h1>
            <div className="flex gap-4">
              <span className="text-black text-[3vw] lg:text-[1vw] font-medium">
                {car.kilometers} KM
              </span>
              <span className="text-black text-[3vw] lg:text-[1vw] font-medium">
                {car.year}
              </span>
            </div>
          </div>
          <p
            style={{ direction: "rtl" }}
            className="text-black text-justify text-[3vw] md:text-[1.5vw] lg:text-[1vw] font-bold line-clamp-4"
          >
            {car.description}
          </p>
        </div>
        <div className="flex flex-row justify-between gap-2 items-center w-full">
          <Image
            className="w-[8vw] md:w-[4vw] lg:w-[2vw]"
            src={whats}
            alt="whatsapp"
          />
          <Image
            className="w-[8vw] md:w-[4vw] lg:w-[2vw]"
            src={phone}
            alt="phone"
          />
          <button className="bg-[#E6E6E6] font-bold text-black rounded-[42.5px] w-[45%]  text-[3vw] md:text-[1.5vw] xl:text-[1vw] p-1">
            {car.condition}
          </button>
          <Link
            href={`/cars/${car.id}`}
            className="bg-[#FDB800] font-bold text-black rounded-[42.5px] w-[45%]  text-[3vw] md:text-[1.5vw] xl:text-[1vw] p-1 flex items-center justify-center hover:bg-yellow-500 transition-colors"
          >
            قراءة المزيد
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div
      className={`flex flex-col items-center  min-h-[549px] gap-4 ${
        isHomePage ? "w-screen" : "w-full"
      } bg-[#FDB800]`}
      style={{ direction: "rtl" }}
    >
      <h1 className="px-[8%] text-[6vw] mt-6  md:text-[3vw] font-bold w-full text-center md:text-right text-gray-900">
        المعروضــات ✨
      </h1>
      <div className="w-full relative flex items-center justify-center">
        {cars.length > 0 ? (
          <EmblaCarousel slides={aboutSlides} options={OPTIONS} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">لا توجد سيارات لعرضها</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCars;
