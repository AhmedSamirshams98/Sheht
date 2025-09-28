import Image from "next/image";
import React, { useState, useEffect } from "react";
import shehtalogo from "../../../public/images/shehtalogo.png";
import { RiCloseLine, RiMenu2Fill } from "react-icons/ri";
import { navLinks } from "@/data/constants";
import Link from "next/link";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isMenuOpen]);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-row items-center justify-between w-full backdrop:backdrop-blur-3xl p-2">
      <div className="flex flex-row justify-between w-full bg-gradient-to-r from-[#3B260680] to-[#3B260680]/50 rounded-[42px]">
        <Link className="flex flex-row gap-1 items-center z-[60]" href="/">
          <Image width={31} height={40}
            className=" object-cover"
            src={shehtalogo}
            alt="shehtatraidingcars شحتة للتجارة"
          />
          <h1 className="font-bold  ">
            شحتة للتجارة
          </h1>
        </Link>

        <button
          onClick={toggleMenu}
          className="text-2xl p-2 z-[60]"
          aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {isMenuOpen ? <RiCloseLine /> : <RiMenu2Fill />}
        </button>
      </div>
      {/* القائمة الجانبية */}
      {isVisible && (
        <div
          className={`fixed top-0 right-0 w-full h-full bg-[#00000081] backdrop-blur-lg z-50 transition-opacity ease-in-out duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="p-4 mt-[20%]" dir="rtl">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className={`block py-3 text-white text-[6vw] rounded px-2 transition-all duration-300 ${
                  isAnimating
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
