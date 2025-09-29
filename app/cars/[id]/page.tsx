"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import whats from "../../../public/images/whatsapp.svg";
import phone from "../../../public/images/phonenumber.svg";
import Image from "next/image";
import { Button } from "../../components/ui/Button";
import { useCarStore } from "@/stores/carStore";
import EmblaCarouselSlider from "../../components/emblaCarouselSlider/EmblaCarouselSlider";
import "../../components/emblaCarouselSlider/emblaCarouselSlider.css";

const CarDetailsPage = () => {
  const params = useParams();
  const carId = Number(params.id);
  const { currentCar, fetchCarById, loading } = useCarStore();

  useEffect(() => {
    if (carId) {
      fetchCarById(carId);
    }
  }, [carId, fetchCarById]);

  // عمل map على الصور لإنشاء slides للـ carousel
  const carSlides =
    currentCar?.images?.map((img, index) => (
      <div key={index} className="slider-slide object-cover">
        <Image
          src={img}
          fill
          alt={`${currentCar.brand} ${currentCar.model} - صورة ${index + 1}`}
          className="object-cover w-full aspect-square"
        />
      </div>
    )) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentCar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">السيارة غير موجودة</p>
      </div>
    );
  }

  console.log("Car ID from URL:", carId);
  console.log("Current Car:", currentCar);

  return (
    <div
      className="min-h-screen px-[8%] mt-[2%] mb-[2%] flex flex-col items-center gap-6"
      style={{ direction: "rtl" }}
    >
      <h1 className="text-[4vw] md:text-[2.5vw] text-[#000000]">
        {currentCar.brand} {currentCar.model}
      </h1>

      <h1 className="text-center text-[3.5vw] md:text-[2vw] font-medium">
        🤲 بفضل ونعمة من الله 🤲
        <br />
        #شحتة_للتجارة {currentCar.brand} {currentCar.model}
      </h1>

      {/* معرض الصور باستخدام EmblaCarouselSlider */}
      <div className="w-full ">
        <EmblaCarouselSlider slides={carSlides} />
      </div>

      {/* معلومات السيارة */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            ماركة السيارة :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.brand}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            موديل السيارة :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.model}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            سنة الصنع :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.year}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            عداد السيارة :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.kilometers} KM
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            حالة السيارة :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.condition}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            امكانية الطلب :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.status === "available" ? "متاح" : "محجوز"}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            للمزيد من التفاصيل :
          </label>
          <button className="relative rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium flex flex-row justify-center items-center w-full hover:bg-gray-50 transition-colors">
            تواصل واتساب
            <Image
              className="absolute left-2 h-full md:w-[3vw] lg:w-[1.5vw]"
              src={whats}
              alt="رقم واتس شحتة للتجارة"
            />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            للمزيد من التفاصيل :
          </label>
          <button className="relative rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium flex flex-row justify-center items-center w-full hover:bg-gray-50 transition-colors">
            تواصل هاتفياً
            <Image
              className="absolute left-2 h-full md:w-[3vw] lg:w-[1.5vw]"
              src={phone}
              alt="رقم اتصال شحتة للتجاره"
            />
          </button>
        </div>
      </div>

      {/* الوصف */}
      <div className="w-full max-w-4xl">
        <h2 className="text-[4vw] md:text-[2vw] font-bold mb-4">وصف السيارة</h2>
        <p className="text-[3.5vw] md:text-[1.5vw] text-justify leading-relaxed bg-white p-6 rounded-2xl">
          {currentCar.description}
        </p>
      </div>

      <Button kind="secondary">اطلبها الآن!</Button>
    </div>
  );
};

export default CarDetailsPage;
