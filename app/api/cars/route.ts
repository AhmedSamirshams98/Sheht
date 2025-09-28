import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // تأكد من الاستيراد كـ default
import { handleFileUpload } from "@/lib/upload";
import { CarResponse, CreateCarInput } from "@/types/car";

export async function GET(): Promise<NextResponse> {
  try {
    // استخدم prisma.cars بدلاً من prisma.car
    const cars = await prisma.cars.findMany({
      include: {
        car_images: { // استخدم car_images بدلاً من images
          select: {
            image_url: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const formattedCars: CarResponse[] = cars.map((car) => ({
      id: car.id,
      brand: car.brand,
      model: car.model,
      description: car.description || undefined,
      kilometers: car.kilometers || undefined,
      status: car.status,
      created_at: car.created_at.toISOString(),
      updated_at: car.updated_at.toISOString(),
      images: car.car_images.map((img) => img.image_url), // استخدم car_images بدلاً من images
    }));

    return NextResponse.json(formattedCars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const contentType: string = request.headers.get("content-type") || "";

    let brand: string = "";
    let model: string = "";
    let description: string | null = null;
    let kilometers: number | null = null;
    let status: string = "available";
    let images: string[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData: FormData = await request.formData();

      brand = (formData.get("brand") as string) || "";
      model = (formData.get("model") as string) || "";
      description = (formData.get("description") as string) || null;

      const kilometersStr: string = formData.get("kilometers") as string;
      kilometers = kilometersStr ? parseInt(kilometersStr) : null;

      status = (formData.get("status") as string) || "available";

      const imageFiles: File[] = formData.getAll("images") as File[];
      if (imageFiles && imageFiles.length > 0) {
        images = await handleFileUpload(formData);
      }
    } else {
      const jsonData: CreateCarInput & { images?: string[] } = await request.json();
      brand = jsonData.brand || "";
      model = jsonData.model || "";
      description = jsonData.description || null;
      kilometers = jsonData.kilometers || null;
      status = jsonData.status || "available";
      images = jsonData.images || [];
    }

    if (!brand || !model) {
      return NextResponse.json(
        { error: "Brand and model are required" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // استخدم tx.cars.create بدلاً من tx.car.create
      const car = await tx.cars.create({
        data: {
          brand,
          model,
          description,
          kilometers,
          status,
        },
      });

      if (images.length > 0) {
        // استخدم tx.car_images.createMany بدلاً من tx.carImage.createMany
        await tx.car_images.createMany({
          data: images.map((imageUrl: string) => ({
            car_id: car.id,
            image_url: imageUrl,
          })),
        });
      }

      // استخدم tx.cars.findUnique بدلاً من tx.car.findUnique
      return await tx.cars.findUnique({
        where: { id: car.id },
        include: {
          car_images: { // استخدم car_images بدلاً من images
            select: { image_url: true },
          },
        },
      });
    });

    if (!result) {
      throw new Error("Failed to create car");
    }

    const formattedCar: CarResponse = {
      id: result.id,
      brand: result.brand,
      model: result.model,
      description: result.description || undefined,
      kilometers: result.kilometers || undefined,
      status: result.status,
      created_at: result.created_at.toISOString(),
      updated_at: result.updated_at.toISOString(),
      images: result.car_images.map((img) => img.image_url), // استخدم car_images بدلاً من images
    };

    return NextResponse.json(formattedCar, { status: 201 });
  } catch (error: any) {
    console.error("Error creating car:", error);
    return NextResponse.json(
      { error: "Failed to create car. Please check your input." },
      { status: 500 }
    );
  }
}