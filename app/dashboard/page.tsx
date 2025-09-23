"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Car {
  id?: number;
  brand: string;
  model: string;
  description: string;
  kilometers: number;
  status: string;
  images: string[];
}

// تعريف نوع للبيانات في النموذج
interface CarFormData {
  brand: string;
  model: string;
  description: string;
  kilometers: number;
  status: string;
  imageFiles: File[]; // ملفات الصور
  imageUrls: string[]; // روابط الصور بعد التحميل
}

export default function Dashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<CarFormData>({
    brand: "",
    model: "",
    description: "",
    kilometers: 0,
    status: "available",
    imageFiles: [],
    imageUrls: [],
  });
  const [message, setMessage] = useState("");

  // جلب جميع السيارات
  const fetchCars = async () => {
    try {
      const response = await fetch("/api/cars");
      if (response.ok) {
        const data = await response.json();
        setCars(data);
      } else {
        setMessage("فشل في جلب بيانات السيارات");
      }
    } catch (error) {
      setMessage("حدث خطأ في الاتصال بالخادم");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // دالة إضافة السيارة
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // تحميل الصور أولاً إذا وجدت
      let uploadedImageUrls: string[] = [...formData.imageUrls];

      if (formData.imageFiles.length > 0) {
        const newUrls = await uploadImages(formData.imageFiles);
        uploadedImageUrls = [...uploadedImageUrls, ...newUrls];

        if (newUrls.length === 0 && formData.imageFiles.length > 0) {
          throw new Error("فشل في تحميل الصور");
        }
      }

      // إرسال بيانات السيارة مع روابط الصور
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: formData.brand,
          model: formData.model,
          description: formData.description,
          kilometers: formData.kilometers,
          status: formData.status,
          images: uploadedImageUrls,
        }),
      });

      if (response.ok) {
        const newCar = await response.json();
        setCars([newCar, ...cars]);
        setFormData({
          brand: "",
          model: "",
          description: "",
          kilometers: 0,
          status: "available",
          imageFiles: [],
          imageUrls: [],
        });
        setMessage("تم إضافة السيارة بنجاح!");
      } else {
        const errorData = await response.json();
        setMessage(
          `فشل في إضافة السيارة: ${errorData.error || "خطأ غير معروف"}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage(
        error instanceof Error ? error.message : "حدث خطأ في الاتصال بالخادم"
      );
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  // دالة تحميل الصور
  const uploadImages = async (imageFiles: File[]): Promise<string[]> => {
    if (imageFiles.length === 0) return [];

    try {
      const uploadFormData = new FormData();
      imageFiles.forEach((file) => {
        uploadFormData.append("images", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "فشل في تحميل الصور");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  // دالة إضافة الصور
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...newImages],
    }));
  };

  // دالة حذف صورة
  const removeImage = (index: number, type: "files" | "urls") => {
    setFormData((prev) => {
      if (type === "files") {
        const updatedFiles = [...prev.imageFiles];
        updatedFiles.splice(index, 1);
        return { ...prev, imageFiles: updatedFiles };
      } else {
        const updatedUrls = [...prev.imageUrls];
        updatedUrls.splice(index, 1);
        return { ...prev, imageUrls: updatedUrls };
      }
    });
  };

  // دالة إضافة رابط صورة يدوياً
  const addImageUrl = () => {
    const url = prompt("أدخل رابط الصورة:");
    if (url && url.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, url.trim()],
      }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        لوحة تحكم إدارة السيارات
      </h1>

      {message && (
        <div
          className={`p-4 mb-4 rounded ${
            message.includes("نجاح") || message.includes("تم")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* نموذج إضافة سيارة */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">إضافة سيارة جديدة</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">الماركة</label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="أدخل الماركة"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">الموديل</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="أدخل الموديل"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">الوصف</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="أدخل وصف السيارة"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                عدد الكيلومترات
              </label>
              <input
                type="number"
                value={formData.kilometers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    kilometers: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full p-2 border rounded"
                placeholder="أدخل عدد الكيلومترات"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">الحالة</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="available">متاح</option>
                <option value="sold">تم البيع</option>
                <option value="reserved">محجوز</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                صور السيارة
              </label>

              {/* رفع ملفات */}
              <div className="mb-4">
                <p className="text-sm mb-2">رفع ملفات الصور:</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded mb-2"
                />
              </div>

              {/* إضافة روابط يدوياً */}
              <div className="mb-4">
                <p className="text-sm mb-2">أو إضافة روابط صور:</p>
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  + إضافة رابط صورة
                </button>
              </div>

              {/* معاينة الملفات */}
              {formData.imageFiles.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm mb-2">الملفات المرفوعة:</p>
                  <div className="space-y-2">
                    {formData.imageFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <span className="text-sm truncate max-w-xs">
                            {file.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index, "files")}
                          className="text-red-500 hover:text-red-700"
                        >
                          حذف
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* معاينة الروابط */}
              {formData.imageUrls.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm mb-2">روابط الصور:</p>
                  <div className="space-y-2">
                    {formData.imageUrls.map((url, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded"
                      >
                        <span className="text-sm truncate max-w-xs">{url}</span>
                        <button
                          type="button"
                          onClick={() => removeImage(index, "urls")}
                          className="text-red-500 hover:text-red-700"
                        >
                          حذف
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "جاري الإضافة..." : "إضافة السيارة"}
            </button>
          </form>
        </div>

        {/* قائمة السيارات */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            قائمة السيارات ({cars.length})
          </h2>

          {cars.length === 0 ? (
            <p className="text-gray-500">لا توجد سيارات مضافة بعد.</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cars.map((car) => (
                <div key={car.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-gray-600">{car.description}</p>
                      <p className="text-gray-700">
                        الكيلومترات: {car.kilometers}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          car.status === "available"
                            ? "bg-green-100 text-green-800"
                            : car.status === "sold"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {car.status === "available"
                          ? "متاح"
                          : car.status === "sold"
                          ? "تم البيع"
                          : "محجوز"}
                      </span>
                    </div>

                    {car.images && car.images.length > 0 && (
                      <Image
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                  </div>

                  {car.images && car.images.length > 1 && (
                    <div className="mt-2 flex space-x-2 overflow-x-auto">
                      {car.images.slice(1).map((img, idx) => (
                        <Image
                          key={idx}
                          src={img}
                          alt={`${car.brand} ${car.model} ${idx + 2}`}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
