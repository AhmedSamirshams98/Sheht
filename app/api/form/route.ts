import { NextRequest, NextResponse } from "next/server";
import pool from "../../lib/db";

export async function POST(request: NextRequest) {
  try {
    const {
      customer_name,
      phone_number,
      car_brand,
      car_model,
      car_description,
    } = await request.json();

    // التحقق من البيانات المطلوبة
    if (!customer_name || !phone_number || !car_brand || !car_model) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة" },
        { status: 400 }
      );
    }

    // إدخال البيانات في قاعدة البيانات
    const result = await pool.query(
      `INSERT INTO car_orders 
       (customer_name, phone_number, car_brand, car_model, car_description) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [customer_name, phone_number, car_brand, car_model, car_description]
    );

    return NextResponse.json(
      {
        success: true,
        message: "تم إرسال طلبك بنجاح",
        order: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إرسال الطلب" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM car_orders ORDER BY created_at DESC"
    );

    return NextResponse.json({ orders: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب الطلبات" },
      { status: 500 }
    );
  }
}
