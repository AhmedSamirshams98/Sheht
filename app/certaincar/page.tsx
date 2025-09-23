import React from "react";
import whats from "../../public/images/whatsapp.svg";
import phone from "../../public/images/phonenumber.svg";
import Image from "next/image";
import mercedes from "../../public/images/mercedessample.png";
import { Button } from "../components/ui/Button";

const page = () => {
  return (
    <div
      className="min-h-screen px-[8%] mt-[2%] mb-[2%] flex flex-col items-center gap-6"
      style={{ direction: "rtl" }}
    >
      <h1 className="text-[4vw] md:text-[2.5vw] text-[#000000]">
        Mercedes-AMG G 63
      </h1>
      <h1 className="text-center text-[3.5vw] md:text-[2vw] font-medium">
        🤲 بفضل ونعمة من الله 🤲
        <br />
        #شحتة_للتجارة Mercedes Benz G63 Zero{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full ">
        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            ماركة السيارة :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            Mercedes Benz
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            موديل السيارة : :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            G-63 AMG
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            {" "}
            سنة الصنع :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            2024
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            {" "}
            عداد السيارة :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            Zero KM
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            {" "}
            حالة السيارة :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            جديدة
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            {" "}
            امكانية الطلب :
          </label>
          <h1 className="rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium">
            حجز مسبق
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            {" "}
            للمزيد من التفاصيل :
          </label>
          <h1 className=" relative rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium flex flex-row justify-center items-center">
            تواصل واتساب
            <Image
              className="absolute left-2 h-full md:w-[3vw] lg:w-[1.5vw]"
              src={whats}
              alt="رقم واتس شحتة للتجارة"
            />
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[4vw] md:text-[1.5vw] font-medium">
            {" "}
            للمزيد من التفاصيل :
          </label>
          <h1 className="relative rounded-[34px] bg-white text-black border-[1px] border-[#ffffff] p-[2%] text-center font-medium flex flex-row justify-center items-center">
            تواصل هاتفياً
            <Image
              className="absolute left-2 h-full md:w-[3vw] lg:w-[1.5vw] "
              src={phone}
              alt="رقم اتصال شحتة للتجاره"
            />
          </h1>
        </div>
      </div>
      <Image
        className="w-full "
        src={mercedes}
        alt="shehta car type شحتة للتجارة"
      />
      <Button kind="secondary">اطلبها الآن!</Button>
    </div>
  );
};

export default page;
