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
import "../emblaCarousel/emblaCarousel.css";
import { Button } from "../ui/Button";
import EmblaCarousel from "../emblaCarousel/EmblaCarousel";
import whats from "@/public/images/whatsapp.svg";
import phone from "@/public/images/phonenumber.svg";

const HomeCars = () => {
  const carsData = [
    {
      id: 1,
      image: shehta1,
      brand: "تويوتا",
      model: "كامري",
      year: 2022,
      kilometers: 15000,
      condition: "جيدة جداً",
      description: "سيارة موديل حديث، محافظة عليها، بدون حوادث",
    },
    {
      id: 2,
      image: shehta2,
      brand: "هيونداي",
      model: "سوناتا",
      year: 2021,
      kilometers: 25000,
      condition: "ممتازة",
      description: "كاملة المواصفات، فتحة سقف، رادار خلفي",
    },
    {
      id: 3,
      image: shehta3,
      brand: "كيا",
      model: "سبورتاج",
      year: 2020,
      kilometers: 40000,
      condition: "جيدة",
      description: "دفع رباعي، جير أوتوماتيك، تكييف ثنائي المناطق",
    },
    {
      id: 4,
      image: shehta4,
      brand: "مرسيدس",
      model: "فئة C",
      year: 2019,
      kilometers: 60000,
      condition: "جيدة جداً",
      description: "فاخرة، ملونة، مثبت سرعة، كاميرا خلفية",
    },
    {
      id: 5,
      image: shehta5,
      brand: "بي إم دبليو",
      model: "فئة 3",
      year: 2021,
      kilometers: 30000,
      condition: "ممتازة",
      description: "كاملة المواصفات، نظيفة، صيانة دورية",
    },
    {
      id: 6,
      image: shehta6,
      brand: "نيسان",
      model: "صني",
      year: 2020,
      kilometers: 45000,
      condition: "جيدة",
      description: "اقتصادية في الاستهلاك، مناسبة كسيارة أولى",
    },
    {
      id: 7,
      image: shehta7,
      brand: "شيفروليه",
      model: "كروز",
      year: 2018,
      kilometers: 70000,
      condition: "متوسطة",
      description:
        " هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدا   ",
    },
    {
      id: 8,
      image: shehta8,
      brand: "هوندا",
      model: "سيفيك",
      year: 2022,
      kilometers: 10000,
      condition: "ممتازة",
      description: "موديل حديث، ضمان الوكالة، خالية من الحوادث",
    },
    {
      id: 9,
      image: shehta9,
      brand: "فورد",
      model: "فيوجن",
      year: 2019,
      kilometers: 55000,
      condition: "جيدة",
      description: "مريحة للطرق الطويلة، مسجل شاشة، مقاعد جلد",
    },
  ];

  const aboutSlides = carsData.map((car) => (
    <div
      id="cars"
      key={car.id}
      className="embla__slide  h-auto  bg-white rounded-lg overflow-hidden shadow-lg flex flex-col "
    >
      <div className="relative w-full aspect-square ">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="rounded-[26px]  w-full aspect-square  object-cover  "
        />
      </div>
      <div className="   w-full justify-between  flex  flex-col  h-full gap-4  mt-2  ">
        <div className="flex flex-col ">
          <h3 className="  text-black font-semibold text-center text-[6vw] md:text-[1.5vw] lg:text-[1vw]">
            {car.model}
          </h3>
          <div className="flex flex-row justify-between mt-2  ">
            <h1 className="text-black text-[4vw] md:text-[1.5vw] lg:text-[1vw] font-medium">
              {car.brand}
            </h1>
            <div className="flex justify-between gap-6">
              <span className="text-black text-[4vw] md:text-[1.5vw] lg:text-[1vw] font-medium">
                {car.kilometers.toLocaleString()}KM
              </span>
              <span className="text-black text-[4vw] md:text-[1.5vw] lg:text-[1vw] font-medium">
                {" "}
                {car.year}
              </span>
            </div>
          </div>
          <p
            style={{ direction: "rtl" }}
            className=" text-black text-[4vw] md:text-[1.5vw] lg:text-[1vw] text-right font-medium line-clamp-3  "
          >
            {/* {car.description} */}
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
            القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
            الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
            توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام هنا يوجد محتوى
            نصي، هنا يوجد محتوى نص فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء.
          </p>
        </div>
        <div className="flex flex-row justify-between gap-1 w-full ">
          <Image
            width={50}
            height={50}
            src={whats}
            alt="shehta trading whatsapp"
          />
          <Image
            width={50}
            height={50}
            src={phone}
            alt="shehta trading whatsapp"
          />
          <button className="bg-[#E6E6E6] w-full    font-bold text-black rounded-[42.5px]  text- text-[4vw] md:text-[1.5vw] lg:text-[1.2vw] xl:text-[0.8vw] p-1">
            {car.condition}
          </button>
          <button className="bg-[#FDB800] w-full   font-bold text-black rounded-[42.5px]  text- text-[4vw] md:text-[1.5vw] lg:text-[1.2vw] xl:text-[0.8vw] p-1">
            قراءة المزيد
          </button>
        </div>
      </div>
    </div>
  ));

  const OPTIONS = {
    loop: true,
    duration: 20,
  };

  return (
    <div
      className="bg-[#FDB800] w-screen py-10 flex flex-col items-center"
      style={{ direction: "rtl" }}
    >
      <h1 className="px-[8%] text-[8vw]  md:text-[2vw] font-bold text-center !md:text-right text-gray-900">
        المعروضــات ✨
      </h1>
      <div className=" ">
        <EmblaCarousel slides={aboutSlides} options={OPTIONS} />
      </div>

      <Button kind="secondarySpecial">عرض الكل</Button>
    </div>
  );
};

export default HomeCars;
