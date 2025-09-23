import Image from "next/image";
import React from "react";
import order from "../../public/images/order.svg";
import { Button } from "antd";

const HomeHowtoOrder = () => {
  return (
    <div className="flex  flex-col items-center  justify-center gap-6 w-full">
      <Image src={order} alt="كيف تطلب سيارتك من شحتة للتجاره" />
      {/* <button className=" text-black bg-[#FDB800] drop-shadow-[#00000040] rounded-[42.5px]">
        ! اطلب سيارتك الآن
      </button> */}
      <Button>! اطلب سيارتك الآن</Button>
    </div>
  );
};

export default HomeHowtoOrder;
