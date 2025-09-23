"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: "primary" | "secondary";
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode; // إضافة أيقونة
}

export const Button = ({ kind = "primary", children }: ButtonProps) => {
  const variantClasses = {
    primary:
      "bg-[#FDB800]  text-black  text-[2.2vw] w-[22vw] h-[4.2vw]  rounded-[42.5px] ",
    secondary:
      "bg-black text-white text-[2.2vw] w-[22vw] h-[4.2vw] rounded-[42.2px] ",
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
