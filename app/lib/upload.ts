import fs from "fs";
import path from "path";

export const handleFileUpload = async (
  formData: FormData
): Promise<string[]> => {
  // إنشاء مجلد التحميلات إذا لم يكن موجوداً
  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const files = formData.getAll("images") as File[];
  const uploadedUrls: string[] = [];

  for (const file of files) {
    if (file.size === 0) continue;

    // إنشاء اسم فريد للملف
    const extension = path.extname(file.name);
    const filename = `car-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}${extension}`;
    const filepath = path.join(uploadDir, filename);

    // تحويل File إلى buffer وحفظه
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filepath, buffer);

    uploadedUrls.push(`/uploads/${filename}`);
  }

  return uploadedUrls;
};
