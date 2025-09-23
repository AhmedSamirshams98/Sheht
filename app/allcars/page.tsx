import Image from "next/image";
import React from "react";
import mercedes from "../../public/images/mercedessample.png";
import whats from "../../public/images/whatsapp.svg";
import phone from "../../public/images/phonenumber.svg";

const page = () => {
  return (
    <div
      className="min-h-screen px-[8%] mt-[2%] mb-[2%] "
      style={{ direction: "rtl" }}
    >
      <h1 className="text-[2.5vw] font-bold ">المعروضــات ✨</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {/* <div className="w-[384px] h-[628px] rounded-[26px] bg-[#ffffff] p-4">
          dsa
        </div> */}
        <div className=" p-4  rounded-[26px] bg-[#ffffff] flex flex-col items-center gap-2">
          <Image
            className="rounded-[26px] w-full aspect-square object-cover "
            src={mercedes}
            alt="سيارات شحتة للتجارة shehta trading cars "
          />
          <h1 className="font-bold text-black text-[3vw] md:text-[2vw]">
            Macan T
          </h1>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row items-center gap-2">
              <h1 className=" text-[4vw] md:text-[2vw] font-medium">2023</h1>

              <h1
                className=" text-[4vw] md:text-[2vw] font-medium"
                style={{ direction: "ltr" }}
              >
                0 KM
              </h1>
            </div>
            <h1 className="text-[4vw] md:text-[2vw] font-medium">Mercedes</h1>
          </div>
          <h1 className="text-[4vw] md:text-[2vw] font-medium text-justify">
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
            القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
            الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
          </h1>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <button className="bg-[#FDB800] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]  ">
              قراءة المزيد
            </button>
            <button className=" bg-[#E6E6E6] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]">
              متاح للطلب
            </button>
            <div className="flex flex-row gap-2">
              <Image src={whats} alt="رقم واتس شحتة للتجارة" />
              <Image src={phone} alt="رقم اتصال شحتة للتجارة" />
            </div>
          </div>
        </div>
        <div className=" p-4  rounded-[26px] bg-[#ffffff] flex flex-col items-center gap-2">
          <Image
            className="rounded-[26px] w-full aspect-square object-cover "
            src={mercedes}
            alt="سيارات شحتة للتجارة shehta trading cars "
          />
          <h1 className="font-bold text-black text-[3vw] md:text-[2vw]">
            Macan T
          </h1>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row items-center gap-2">
              <h1 className=" text-[4vw] md:text-[2vw] font-medium">2023</h1>

              <h1
                className=" text-[4vw] md:text-[2vw] font-medium"
                style={{ direction: "ltr" }}
              >
                0 KM
              </h1>
            </div>
            <h1 className="text-[4vw] md:text-[2vw] font-medium">Mercedes</h1>
          </div>
          <h1 className="text-[4vw] md:text-[2vw] font-medium text-justify">
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
            القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
            الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
          </h1>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <button className="bg-[#FDB800] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]  ">
              قراءة المزيد
            </button>
            <button className=" bg-[#E6E6E6] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]">
              متاح للطلب
            </button>
            <div className="flex flex-row gap-2">
              <Image src={whats} alt="رقم واتس شحتة للتجارة" />
              <Image src={phone} alt="رقم اتصال شحتة للتجارة" />
            </div>
          </div>
        </div>
        <div className=" p-4  rounded-[26px] bg-[#ffffff] flex flex-col items-center gap-2">
          <Image
            className="rounded-[26px] w-full aspect-square object-cover "
            src={mercedes}
            alt="سيارات شحتة للتجارة shehta trading cars "
          />
          <h1 className="font-bold text-black text-[3vw] md:text-[2vw]">
            Macan T
          </h1>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row items-center gap-2">
              <h1 className=" text-[4vw] md:text-[2vw] font-medium">2023</h1>

              <h1
                className=" text-[4vw] md:text-[2vw] font-medium"
                style={{ direction: "ltr" }}
              >
                0 KM
              </h1>
            </div>
            <h1 className="text-[4vw] md:text-[2vw] font-medium">Mercedes</h1>
          </div>
          <h1 className="text-[4vw] md:text-[2vw] font-medium text-justify">
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
            القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
            الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
          </h1>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <button className="bg-[#FDB800] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]  ">
              قراءة المزيد
            </button>
            <button className=" bg-[#E6E6E6] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]">
              متاح للطلب
            </button>
            <div className="flex flex-row gap-2">
              <Image src={whats} alt="رقم واتس شحتة للتجارة" />
              <Image src={phone} alt="رقم اتصال شحتة للتجارة" />
            </div>
          </div>
        </div>
        <div className=" p-4  rounded-[26px] bg-[#ffffff] flex flex-col items-center gap-2">
          <Image
            className="rounded-[26px] w-full aspect-square object-cover "
            src={mercedes}
            alt="سيارات شحتة للتجارة shehta trading cars "
          />
          <h1 className="font-bold text-black text-[3vw] md:text-[2vw]">
            Macan T
          </h1>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row items-center gap-2">
              <h1 className=" text-[4vw] md:text-[2vw] font-medium">2023</h1>

              <h1
                className=" text-[4vw] md:text-[2vw] font-medium"
                style={{ direction: "ltr" }}
              >
                0 KM
              </h1>
            </div>
            <h1 className="text-[4vw] md:text-[2vw] font-medium">Mercedes</h1>
          </div>
          <h1 className="text-[4vw] md:text-[2vw] font-medium text-justify">
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
            القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
            الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
          </h1>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <button className="bg-[#FDB800] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]  ">
              قراءة المزيد
            </button>
            <button className=" bg-[#E6E6E6] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]">
              متاح للطلب
            </button>
            <div className="flex flex-row gap-2">
              <Image src={whats} alt="رقم واتس شحتة للتجارة" />
              <Image src={phone} alt="رقم اتصال شحتة للتجارة" />
            </div>
          </div>
        </div>
        <div className=" p-4  rounded-[26px] bg-[#ffffff] flex flex-col items-center gap-2">
          <Image
            className="rounded-[26px] w-full aspect-square object-cover "
            src={mercedes}
            alt="سيارات شحتة للتجارة shehta trading cars "
          />
          <h1 className="font-bold text-black text-[3vw] md:text-[2vw]">
            Macan T
          </h1>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row items-center gap-2">
              <h1 className=" text-[4vw] md:text-[2vw] font-medium">2023</h1>

              <h1
                className=" text-[4vw] md:text-[2vw] font-medium"
                style={{ direction: "ltr" }}
              >
                0 KM
              </h1>
            </div>
            <h1 className="text-[4vw] md:text-[2vw] font-medium">Mercedes</h1>
          </div>
          <h1 className="text-[4vw] md:text-[2vw] font-medium text-justify">
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
            القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
            الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
          </h1>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <button className="bg-[#FDB800] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]  ">
              قراءة المزيد
            </button>
            <button className=" bg-[#E6E6E6] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]">
              متاح للطلب
            </button>
            <div className="flex flex-row gap-2">
              <Image src={whats} alt="رقم واتس شحتة للتجارة" />
              <Image src={phone} alt="رقم اتصال شحتة للتجارة" />
            </div>
          </div>
        </div>
        <div className=" p-4  rounded-[26px] bg-[#ffffff] flex flex-col items-center gap-2">
          <Image
            className="rounded-[26px] w-full aspect-square object-cover "
            src={mercedes}
            alt="سيارات شحتة للتجارة shehta trading cars "
          />
          <h1 className="font-bold text-black text-[3vw] md:text-[2vw]">
            Macan T
          </h1>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row items-center gap-2">
              <h1 className=" text-[4vw] md:text-[2vw] font-medium">2023</h1>

              <h1
                className=" text-[4vw] md:text-[2vw] font-medium"
                style={{ direction: "ltr" }}
              >
                0 KM
              </h1>
            </div>
            <h1 className="text-[4vw] md:text-[2vw] font-medium">Mercedes</h1>
          </div>
          <h1 className="text-[4vw] md:text-[2vw] font-medium text-justify">
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
            القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
            الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
          </h1>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <button className="bg-[#FDB800] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]  ">
              قراءة المزيد
            </button>
            <button className=" bg-[#E6E6E6] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]">
              متاح للطلب
            </button>
            <div className="flex flex-row gap-2">
              <Image src={whats} alt="رقم واتس شحتة للتجارة" />
              <Image src={phone} alt="رقم اتصال شحتة للتجارة" />
            </div>
          </div>
        </div>
        <div className=" p-4  rounded-[26px] bg-[#ffffff] flex flex-col items-center gap-2">
          <Image
            className="rounded-[26px] w-full aspect-square object-cover "
            src={mercedes}
            alt="سيارات شحتة للتجارة shehta trading cars "
          />
          <h1 className="font-bold text-black text-[3vw] md:text-[2vw]">
            Macan T
          </h1>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row items-center gap-2">
              <h1 className=" text-[4vw] md:text-[2vw] font-medium">2023</h1>

              <h1
                className=" text-[4vw] md:text-[2vw] font-medium"
                style={{ direction: "ltr" }}
              >
                0 KM
              </h1>
            </div>
            <h1 className="text-[4vw] md:text-[2vw] font-medium">Mercedes</h1>
          </div>
          <h1 className="text-[4vw] md:text-[2vw] font-medium text-justify">
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
            القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
            الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
          </h1>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <button className="bg-[#FDB800] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]  ">
              قراءة المزيد
            </button>
            <button className=" bg-[#E6E6E6] w-[40%] p-1 rounded-[42.5px] text-[4vw] md:text-[2vw] lg:text-[1vw]">
              متاح للطلب
            </button>
            <div className="flex flex-row gap-2">
              <Image src={whats} alt="رقم واتس شحتة للتجارة" />
              <Image src={phone} alt="رقم اتصال شحتة للتجارة" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
