import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CarResponse, CreateCarInput } from "../../../../types/car";
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const carId = parseInt(params.id);

    const existingCar = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!existingCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    const contentType = request.headers.get("content-type") || "";
    let brand = "";
    let model = "";
    let description: string | null = null;
    let kilometers: number | null = null;
    let status = "available";
    let images: string[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      brand = (formData.get("brand") as string) || "";
      model = (formData.get("model") as string) || "";
      description = (formData.get("description") as string) || null;
      kilometers = parseInt(formData.get("kilometers") as string) || null;
      status = (formData.get("status") as string) || "available";

      const imageFiles = formData.getAll("images") as File[];
      if (imageFiles.length > 0) {
        const { handleFileUpload } = await import("../../../lib/upload");
        images = await handleFileUpload(formData);
      }
    } else {
      const jsonData: CreateCarInput & { images?: string[] } =
        await request.json();

      ({
        brand = "",
        model = "",
        description = null,
        kilometers = null,
        status = "available",
        images = [],
      } = jsonData);
    }

    // هنا النوع بتاع tx بيتحدد تلقائيًا كـ Prisma.TransactionClient
    const result = await prisma.$transaction(async (tx) => {
      const updatedCar = await tx.car.update({
        where: { id: carId },
        data: {
          brand,
          model,
          description,
          kilometers,
          status,
          updated_at: new Date(),
        },
      });

      await tx.carImage.deleteMany({ where: { car_id: carId } });

      if (images.length > 0) {
        await tx.carImage.createMany({
          data: images.map((imageUrl) => ({
            car_id: carId,
            image_url: imageUrl,
          })),
        });
      }

      return tx.car.findUnique({
        where: { id: carId },
        include: { images: { select: { image_url: true } } },
      });
    });

    if (!result) {
      throw new Error("Failed to update car");
    }

    const formattedCar: CarResponse = {
      id: result.id,
      brand: result.brand,
      model: result.model,
      description: result.description,
      kilometers: result.kilometers,
      status: result.status,
      created_at: result.created_at.toISOString(),
      updated_at: result.updated_at.toISOString(),
      images: result.images.map((img) => img.image_url), // img معروف هنا
    };

    return NextResponse.json(formattedCar);
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { error: "Failed to update car" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const carId = parseInt(params.id);

    // التحقق من وجود السيارة
    const existingCar = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!existingCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // استخدام transaction للحذف (بسبب العلاقات)
    await prisma.$transaction(async (tx) => {
      // حذف الصور المرتبطة أولاً (بسبب foreign key constraint)
      await tx.carImage.deleteMany({
        where: { car_id: carId },
      });

      // ثم حذف السيارة
      await tx.car.delete({
        where: { id: carId },
      });
    });

    return NextResponse.json(
      { message: "Car deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { error: "Failed to delete car" },
      { status: 500 }
    );
  }
}
