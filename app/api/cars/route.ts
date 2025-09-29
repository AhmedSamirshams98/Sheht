import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const cars = await prisma.cars.findMany({
      include: { car_images: true },
    });

    const formattedCars = cars.map((car) => ({
      ...car,
      images: car.car_images.map((img) => img.image_url),
      created_at: car.created_at.toISOString(),
      updated_at: car.updated_at.toISOString(),
    }));

    return NextResponse.json(formattedCars);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const brand = formData.get("brand") as string;
    const model = formData.get("model") as string;
    const year = parseInt(formData.get("year") as string);
    const condition = formData.get("condition") as string;
    const description = formData.get("description") as string;
    const kilometers = parseInt(formData.get("kilometers") as string);
    const status = formData.get("status") as string;

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const car = await prisma.cars.create({
      data: { brand, model, year, condition, description, kilometers, status },
    });

    const files = formData.getAll("images") as File[];
    const savedImages: string[] = [];

    for (const file of files) {
      const bytes = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, bytes);

      const imageUrl = `/uploads/${fileName}`;
      savedImages.push(imageUrl);

      await prisma.car_images.create({
        data: { image_url: imageUrl, car_id: car.id },
      });
    }

    return NextResponse.json({ ...car, images: savedImages }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "فشل في إضافة السيارة" },
      { status: 500 }
    );
  }
}
