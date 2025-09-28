"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: "primary" | "secondary" | "secondarySpecial";
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode; // إضافة أيقونة
}

export const Button = ({ kind = "primary", children }: ButtonProps) => {
  const variantClasses = {
    primary:
      "bg-[#FDB800]  text-black  text-[2.5vw] w-[24vw] h-[6vw]  rounded-[42.5px]  cursor-pointer",
    secondary:
      "bg-black text-white text-[2.2vw] w-[22vw] h-[4.2vw] rounded-[42.2px] cursor-pointer ",
    secondarySpecial:
      "bg-black text-white text-[2.2vw] w-[22vw] h-[4.2vw] rounded-[42.2px] cursor-pointer -mt-[3.5%] ",
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
