import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const carId = parseInt(params.id);
    const { brand, model, description, kilometers, status, images } =
      await request.json();

    // تحديث بيانات السيارة في قاعدة البيانات
    const result = await pool.query(
      `UPDATE cars SET brand = $1, model = $2, description = $3, kilometers = $4, status = $5, updated_at = NOW() 
         WHERE id = $6 RETURNING *`,
      [brand, model, description, kilometers, status, carId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // تحديث الصور (حذف القديمة وإضافة الجديدة)
    await pool.query("DELETE FROM car_images WHERE car_id = $1", [carId]);

    if (images && images.length > 0) {
      for (const imageUrl of images) {
        await pool.query(
          "INSERT INTO car_images (car_id, image_url) VALUES ($1, $2)",
          [carId, imageUrl]
        );
      }
    }

    // جلب السيارة المحدثة مع صورها
    const finalResult = await pool.query(
      `SELECT cars.*, 
                COALESCE(array_agg(car_images.image_url) FILTER (WHERE car_images.image_url IS NOT NULL), '{}') as images 
         FROM cars 
         LEFT JOIN car_images ON cars.id = car_images.car_id 
         WHERE cars.id = $1 
         GROUP BY cars.id`,
      [carId]
    );

    return NextResponse.json(finalResult.rows[0]);
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { error: "Failed to update car" },
      { status: 500 }
    );
  }
}
