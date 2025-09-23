// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { handleFileUpload } from "@/app/lib/upload";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageUrls = await handleFileUpload(formData);
    
    return NextResponse.json(imageUrls);
  } catch (error) {
    console.error("Error uploading images:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}