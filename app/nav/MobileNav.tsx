import Image from "next/image";
import React, { useState, useEffect } from "react";
import shehtalogo from "../../public/images/shehtalogo.png";
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
      document.body.style.overflow = "hidden"; // منع التمرير عند فتح القائمة
    } else {
      // بدء animation الإخفاء
      setIsAnimating(false);
      // إخفاء القائمة بعد انتهاء animation
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "unset"; // إعادة التمرير
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
    <div className="flex flex-row justify-between   w-full">
      <div className="flex flex-row items-center gap-2">
        <Image
          className="w-[10vw]"
          src={shehtalogo}
          alt="shehtatraidingcars شحتة للتجارة"
        />
        <h1 className="font-bold text-[4vw]">شحتة للتجارة</h1>
      </div>

      <button
        onClick={toggleMenu}
        className="text-2xl p-2"
        aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
      >
        {isMenuOpen ? <RiCloseLine /> : <RiMenu2Fill />}
      </button>

      {/* Overlay مع animation */}
      {isVisible && (
        <div
          className={`fixed  z-50 bg-black transition-opacity duration-300 ease-in-out ${
            isAnimating ? "opacity-50" : "opacity-0"
          }`}
          onClick={closeMenu}
        />
      )}

      {isVisible && (
        <div
          className={`fixed h-[40vh] w-[86%]  top-12 rounded-[10px] bg-[#FDB800]/100 backdrop-blur-lg z-50 transform transition-transform duration-300 ease-in-out ${
            isAnimating ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="p-4" dir="rtl">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.path}
                className={`block py-3 text-black text-[6vw] hover:bg-gray-100 rounded px-2 transition-all duration-200 ${
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
