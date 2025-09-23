import React from "react";
import HomeFirst from "./components/HomeFirst";
import HomeMarque from "./components/HomeMarque";
import HomeAbout from "./components/HomeAbout";
import HomeHowtoOrder from "./components/HomeHowtoOrder";
import HomeCars from "./components/HomeCars";

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
