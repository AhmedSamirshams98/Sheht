"use client";
import React, { useEffect, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

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
          className="object-cover  rounded-[26px] "
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
    <div className="min-h-screen px-[8%] mt-[2%] mb-[2%] flex flex-col items-center gap-6">
      <h1 className="text-[3vw] md:text-[2vw] text-[#000000]">
        {currentCar.brand} {currentCar.model}
      </h1>

      <h1 className="text-center text-[2.5vw] md:text-[1.3vw] font-medium">
        🤲 بفضل ونعمة من الله 🤲
        <br />
        #شحتة_للتجارة {currentCar.brand} {currentCar.model}
      </h1>

      {/* معلومات السيارة */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
        style={{ direction: "rtl" }}
      >
        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.2vw] font-medium">
            ماركة السيارة :
          </label>
          <h1 className="rounded-[34px] text-[4vw] md:text-[1.2vw] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.brand}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.2vw] font-medium">
            موديل السيارة :
          </label>
          <h1 className="rounded-[34px] text-[4vw] md:text-[1.2vw] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.model}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.2vw] font-medium">
            سنة الصنع :
          </label>
          <h1 className="rounded-[34px] text-[4vw] md:text-[1.2vw] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.year}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.2vw] font-medium">
            عداد السيارة :
          </label>
          <h1 className="rounded-[34px] text-[4vw] md:text-[1.2vw] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.kilometers} KM
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.2vw] font-medium">
            حالة السيارة :
          </label>
          <h1 className="rounded-[34px] text-[4vw] md:text-[1.2vw] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.condition}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.2vw] font-medium">
            امكانية الطلب :
          </label>
          <h1 className="rounded-[34px] text-[4vw] md:text-[1.2vw] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            {currentCar.status === "available" ? "متاح" : "محجوز"}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.2vw] font-medium">
            للمزيد من التفاصيل :
          </label>
          <button className="relative text-[4vw] md:text-[1.2vw] rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium flex flex-row justify-center items-center w-full hover:bg-gray-50 transition-colors">
            تواصل واتساب
            <Image
              className="absolute left-2 h-full md:w-[3vw] lg:w-[1.5vw]"
              src={whats}
              alt="رقم واتس شحتة للتجارة"
            />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.2vw] font-medium">
            للمزيد من التفاصيل :
          </label>
          <button className="relative rounded-[34px] text-[4vw] md:text-[1.2vw] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium flex flex-row justify-center items-center w-full hover:bg-gray-50 transition-colors">
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
      <div className="text-right">
        <h2 className="text-[4vw] md:text-[1.2vw] font-medium text-black mb-1">
          وصف السيارة
        </h2>
        <p
          className="text-[3.5vw] md:text-[1.2vw] font-medium text-justify  leading-relaxed bg-white p-4 rounded-2xl"
          style={{ direction: "rtl" }}
        >
          {currentCar.description}
        </p>
      </div>
      <div onClick={() => setIsOpen(true)} className="w-full cursor-pointer">
        <EmblaCarouselSlider slides={carSlides} />
      </div>

      {/* المودال */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50">
          <div className=" relative w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]">
            {/* زر الإغلاق */}
            <button
              onClick={() => setIsOpen(false)}
              className="   absolute right-0 -top-10 z-10 text-white rounded-full w-12 h-12 flex items-center justify-center transition"
            >
              ✕
            </button>

            {/* السلايدر */}
            <EmblaCarouselSlider slides={carSlides} />
          </div>
        </div>
      )}

      <Button kind="secondary">اطلبها الآن!</Button>
    </div>
  );
};

export default CarDetailsPage;
