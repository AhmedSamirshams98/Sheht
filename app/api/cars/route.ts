import { NextRequest, NextResponse } from "next/server";
import pool from "../../lib/db";
import { handleFileUpload } from "@/app/lib/upload";
import { initDatabase } from "@/app/lib/init-db";
interface Car {
  id: number;
  brand: string;
  model: string;
  description: string | null;
  kilometers: number | null;
  status: string;
  created_at: Date;
  updated_at: Date;
  images: string[];
}

initDatabase();
let tablesInitialized = false;

export async function GET() {
  try {
    // تهيئة الجداول إذا لم تكن متهيئة من قبل
    if (!tablesInitialized) {
      await initDatabase();
      tablesInitialized = true;
    }

    const result = await pool.query<Car>(`
      SELECT cars.*, 
             COALESCE(array_agg(car_images.image_url) FILTER (WHERE car_images.image_url IS NOT NULL), '{}') as images 
      FROM cars 
      LEFT JOIN car_images ON cars.id = car_images.car_id 
      GROUP BY cars.id 
      ORDER BY cars.created_at DESC
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars. Please check database connection." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // تهيئة الجداول إذا لم تكن متهيئة من قبل
    if (!tablesInitialized) {
      await initDatabase();
      tablesInitialized = true;
    }

    // التحقق من نوع المحتوى
    const contentType = request.headers.get("content-type") || "";

    let brand,
      model,
      description,
      kilometers,
      status,
      images: string[] = [];

    if (contentType.includes("multipart/form-data")) {
      // معالجة رفع الملفات
      const formData = await request.formData();

      // الحصول على الحقول النصية
      brand = formData.get("brand") as string;
      model = formData.get("model") as string;
      description = formData.get("description") as string;
      kilometers = parseInt(formData.get("kilometers") as string) || 0;
      status = (formData.get("status") as string) || "available";

      // معالجة الصور المرفوعة
      const imageFiles = formData.getAll("images") as File[];
      if (imageFiles && imageFiles.length > 0) {
        images = await handleFileUpload(formData);
      }
    } else {
      const jsonData = await request.json();
      brand = jsonData.brand;
      model = jsonData.model;
      description = jsonData.description;
      kilometers = jsonData.kilometers;
      status = jsonData.status;
      images = jsonData.images || [];
    }
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // إضافة السيارة
      const carResult = await client.query(
        `INSERT INTO cars (brand, model, description, kilometers, status) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [brand, model, description, kilometers, status || "available"]
      );

      const carId = carResult.rows[0].id;

      // إضافة الصور إذا وجدت
      if (images && images.length > 0) {
        for (const imageUrl of images) {
          await client.query(
            "INSERT INTO car_images (car_id, image_url) VALUES ($1, $2)",
            [carId, imageUrl]
          );
        }
      }

      await client.query("COMMIT");

      // جلب السيارة مع صورها
      const finalResult = await client.query(
        `
        SELECT cars.*, 
               COALESCE(array_agg(car_images.image_url) FILTER (WHERE car_images.image_url IS NOT NULL), '{}') as images 
        FROM cars 
        LEFT JOIN car_images ON cars.id = car_images.car_id 
        WHERE cars.id = $1 
        GROUP BY cars.id
      `,
        [carId]
      );

      return NextResponse.json(finalResult.rows[0], { status: 201 });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error creating car:", error);
    return NextResponse.json(
      { error: "Failed to create car. Please check your input." },
      { status: 500 }
    );
  }
}
