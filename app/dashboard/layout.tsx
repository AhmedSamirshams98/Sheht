"use client";
import { useState, useEffect } from "react";
import { User } from "@/types/car";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (!data.user) {
            router.replace("/login"); // إعادة التوجيه إذا لم يوجد مستخدم
          } else {
            setUser(data.user);
          }
        } else {
          router.replace("/login"); // إعادة التوجيه إذا استجابة السيرفر غير OK
        }
      } catch (err) {
        console.error("Session error", err);
        router.replace("/login"); // إعادة التوجيه في حالة الخطأ
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // إذا لم يوجد مستخدم بعد التحميل، لا تعرض شيء
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>
    </div>
  );
}
