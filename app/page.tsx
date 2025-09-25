import React from "react";
import HomeFirst from "./components/HomeComponents/HomeFirst";
import HomeMarque from "./components/HomeComponents/HomeMarque";
import HomeAbout from "./components/HomeComponents/HomeAbout";
import HomeCars from "./components/HomeComponents/HomeCars";
import HomeHowtoOrder from "./components/HomeComponents/HomeHowtoOrder";


const page = () => {
  return (
    <div className="font-graphic text-[2vw] px-[8%]    overflow-hidden  flex flex-col gap-4 items-center">
      <HomeFirst />
      <HomeMarque />
      <HomeAbout />
      <HomeCars />
      <HomeHowtoOrder />
    </div>
  );
};

export default page;
