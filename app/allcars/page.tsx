"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import whats from "../../public/images/whatsapp.svg";
import phone from "../../public/images/phonenumber.svg";
import { useCarStore } from "@/stores/carStore";
import Link from "next/link";
import EmblaCarouselSlider from "../components/emblaCarouselSlider/EmblaCarouselSlider";

const Page = () => {
  const { cars, fetchCars } = useCarStore();

  // استدعاء البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <div
      className="min-h-screen px-[8%] mt-[2%] mb-[2%]"
      style={{ direction: "rtl" }}
    >
      <h1 className="text-[2.5vw] font-bold">المعروضــات ✨</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {cars.map((car) => {
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
              className="  p-[14px] bg-white rounded-[26px] overflow-hidden shadow-lg flex flex-col items-center justify-center"
              style={{ direction: "ltr" }}
            >
              {/* سلايدر صور السيارة */}
              <EmblaCarouselSlider
                slides={carSlides}
                options={{ loop: true }}
              />

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
        })}
      </div>
    </div>
  );
};

export default Page;
