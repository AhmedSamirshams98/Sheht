import React from "react";

import { Button } from "../components/ui/Button";

const page = () => {
  return (
    <div
      className="relative min-h-[100vh] mt-[2%] px-[8%] flex flex-col items-center gap-4  "
      style={{ direction: "rtl" }}
    >
      {/**first part of the form */}
      {/* <div className="flex flex-col md:flex-row   justify-between items-center"> */}
      <div className="flex flex-col text-center md:text-right">
        <h1 className=" text-[6vw] md:text-[2.5vw]">نموذج طلب سيارة ✨</h1>
        <h1 className="font-medium w-full text-[4vw] md:text-[1.6vw]">
          ادخل بيانات التواصل معك و تفاصيل طلبك و سيتم التواصل معك بكل التفاصيل
          اللى محتاج تعرفها زى السعر و المواصفات الكاملة و الموعد المتوقع
          للاستلام
        </h1>
      </div>

      {/**form inputs */}
      <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        <div className="flex flex-col items-start w-full gap-2">
          <label>الاســــــــم :</label>
          <input
            className="font-medium border-[1px] w-full border-[#000000] p-4 placeholder:font-medium rounded-[8px]"
            placeholder="ادخل الاسم بالكامل هنا.."
          ></input>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <label> رقم الهاتف (اتصال & واتساب ) :</label>
          <input
            className="font-medium border-[1px] w-full border-[#000000] p-4 placeholder:font-medium rounded-[8px]"
            placeholder="01234567890"
          ></input>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <label> ماركة السيارة :</label>
          <input
            className=" font-medium border-[1px] w-full border-[#000000] p-4 placeholder:font-medium rounded-[8px]"
            placeholder="مثال : مرسيدس"
          ></input>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <label> موديل السيارة :</label>
          <input
            className=" font-medium border-[1px] w-full border-[#000000] p-4 placeholder:font-medium rounded-[8px]"
            placeholder="مثال : GLC أو جى ال سى"
          ></input>
        </div>
        <div className="flex flex-col items-start w-full gap-2 col-span-2">
          <label> وصف الطلب :</label>
          <textarea
            className="border-[1px] w-full border-[#000000] font-medium p-8 placeholder:font-medium rounded-[8px]"
            placeholder="اكتب سنة التصنيع , اللون , الفئة و كل المواصفات الأخرى.."
          />
        </div>
      </div>
      {/**button */}
      <Button kind="secondary">اطلب سيارتك الآن!</Button>
    </div>
  );
};

export default page;
