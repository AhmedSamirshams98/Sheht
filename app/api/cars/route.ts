import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handleFileUpload } from "@/lib/upload";

export async function GET(): Promise<NextResponse> {
  try {
    const cars = await prisma.cars.findMany({
      include: {
        car_images: {
          select: {
            image_url: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const formattedCars = cars.map((car) => ({
      id: car.id,
      brand: car.brand,
      model: car.model,
      year: car.year || 0,
      condition: car.condition || "جديدة",
      description: car.description || "",
      kilometers: car.kilometers || 0,
      status: car.status,
      images: car.car_images.map((img) => img.image_url),
      created_at: car.created_at.toISOString(),
      updated_at: car.updated_at.toISOString(),
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
    let year: number = 0;
    let condition: string = "جديدة";
    let description: string = "";
    let kilometers: number = 0;
    let status: string = "available";
    let images: string[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData: FormData = await request.formData();

      brand = (formData.get("brand") as string) || "";
      model = (formData.get("model") as string) || "";
      year = parseInt(formData.get("year") as string) || new Date().getFullYear();
      condition = (formData.get("condition") as string) || "جديدة";
      description = (formData.get("description") as string) || "";

      const kilometersStr: string = formData.get("kilometers") as string;
      kilometers = kilometersStr ? parseInt(kilometersStr) : 0;

      status = (formData.get("status") as string) || "available";

      const imageFiles: File[] = formData.getAll("images") as File[];
      if (imageFiles && imageFiles.length > 0) {
        images = await handleFileUpload(formData);
      }
    } else {
      const jsonData = await request.json();
      brand = jsonData.brand || "";
      model = jsonData.model || "";
      year = jsonData.year || new Date().getFullYear();
      condition = jsonData.condition || "جديدة";
      description = jsonData.description || "";
      kilometers = jsonData.kilometers || 0;
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
      const car = await tx.cars.create({
        data: {
          brand,
          model,
          year,
          condition,
          description,
          kilometers,
          status,
        },
      });

      if (images.length > 0) {
        await tx.car_images.createMany({
          data: images.map((imageUrl: string) => ({
            car_id: car.id,
            image_url: imageUrl,
          })),
        });
      }

      return await tx.cars.findUnique({
        where: { id: car.id },
        include: {
          car_images: {
            select: { image_url: true },
          },
        },
      });
    });

    if (!result) {
      throw new Error("Failed to create car");
    }

    const formattedCar = {
      id: result.id,
      brand: result.brand,
      model: result.model,
      year: result.year || 0,
      condition: result.condition || "جديدة",
      description: result.description || "",
      kilometers: result.kilometers || 0,
      status: result.status,
      images: result.car_images.map((img) => img.image_url),
      created_at: result.created_at.toISOString(),
      updated_at: result.updated_at.toISOString(),
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