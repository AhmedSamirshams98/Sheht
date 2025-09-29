"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: "primary" | "secondary" | "secondarySpecial" | "primaryspeciallogout";
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode; // إضافة أيقونة
}

export const Button = ({ kind = "primary", children }: ButtonProps) => {
  const variantClasses = {
    primary:
      "bg-[#FDB800]  text-black  text-[3vw]  md:text-[2vw] w-[28vw] md:w-[20vw] h-[6vw] md:h-[4vw]  rounded-[42.5px]  cursor-pointer",
    secondary:
      "bg-black text-white text-[2.2vw] w-[22vw] h-[4.2vw] rounded-[42.2px] cursor-pointer ",

    secondarySpecial:
      "bg-black text-white w-[50vw] md:w-[40vw] lg:w-[22vw]  p-[4%] md:p-[2%]  text-[4vw] lg:text-[2.5vw] rounded-[42.2px]  cursor-pointer ",
    primaryspeciallogout:
      "bg-red-700  text-white  text-[3vw]  md:text-[2vw] w-[28vw] md:w-[20vw] h-[6vw] md:h-[4vw]  rounded-[42.5px]  cursor-pointer",
  };

  return (
    <button
      className={`
        ${variantClasses[kind]} 
      `}
    >
      {children}
    </button>
  );
};
