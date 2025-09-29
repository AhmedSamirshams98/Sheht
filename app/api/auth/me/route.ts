// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import pool from "@/lib/db";

export async function GET() {
  try {
    // جلب الكوكيز من next/headers
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("Token from cookies:", token ? "Exists" : "Missing");

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // التحقق من التوكن
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // جلب بيانات المستخدم من قاعدة البيانات
    const result = await pool.query(
      "SELECT id, email, name, role, picture FROM users WHERE id = $1",
      [payload.sub]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = result.rows[0];

    console.log("User found in DB:", user.email, "Role:", user.role);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.picture, // ⚠️ هنا نستخدم picture ونرسلها كـ image
      },
    });
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

// دعم طريقة OPTIONS للـ CORS (اختياري)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
