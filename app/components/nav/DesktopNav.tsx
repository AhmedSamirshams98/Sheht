// components/DesktopNav.tsx
import React, { useState } from "react";
import shehtalogo from "../../../public/images/shehtalogo.png";
import Image from "next/image";
import { mainNavLinks, dashboardNavLinks } from "@/data/constants";
import Link from "next/link";
import { User } from "@/types/car";
import { useRouter } from "next/navigation";

interface DesktopNavProps {
  isDashboard?: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ isDashboard = false }) => {
  // اختيار الروابط بناءً على الصفحة
  const links = isDashboard ? dashboardNavLinks : mainNavLinks;
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      router.push("/"); // إعادة التوجيه للصفحة الرئيسية بعد تسجيل الخروج
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className="flex flex-row w-[78%]" style={{ direction: "rtl" }}>
      <div className="w-full flex flex-row backdrop-blur-3xl items-center p-[1%] justify-between rounded-[42px] bg-gradient-to-r from-[#3B260680] to-[#3B260680]/50 text-[1.2vw] lg:text-[1vw]">
        <Link href="/">
          <div className="flex flex-row items-center gap-4">
            <Image
              width={35}
              height={35}
              src={shehtalogo}
              alt="shehtatraidingcars شحتة للتجارة"
            />
            <h3 className="font-bold text-[1.5vw]">شحتة للتجارة</h3>
          </div>
        </Link>
        {links.map((link) => (
          <Link key={link.id} href={link.path}>
            <h1 className="text-[1vw] hover:text-[#fdba00] transition-colors">
              {link.name}
            </h1>
          </Link>
        ))}
        {isDashboard && (
          <div className="mt-2 flex justify-center">
            <button
              className="bg-red-500 p-2 rounded-[26px] text-white w-full max-w-[200px] hover:bg-red-600 transition-colors"
              onClick={logout}
            >
              تسجيل الخروج
            </button>
            <div className="flex flex-col">
              <h1 className="text-white">مرحبا {user?.name}</h1>
              {user?.image && (
                <Image
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full mt-2"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
