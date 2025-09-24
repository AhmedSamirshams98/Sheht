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

interface CarFormData {
  brand: string;
  model: string;
  description: string;
  kilometers: number;
  status: string;
  imageFiles: File[];
  imageUrls: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export default function Dashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  const [formData, setFormData] = useState<CarFormData>({
    brand: "",
    model: "",
    description: "",
    kilometers: 0,
    status: "available",
    imageFiles: [],
    imageUrls: [],
  });

  // جلب بيانات الجلسة والتحقق من الصلاحيات
  // في dashboard.tsx - تحسين fetchSession
  const fetchSession = async () => {
    try {
      setSessionLoading(true);

      // إضافة credentials لضمان إرسال الكوكيز
      const res = await fetch("/api/auth/me", {
        credentials: "include", // هذا مهم جداً
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Session response status:", res.status);

      if (res.ok) {
        const data = await res.json();
        console.log("Session data:", data);
        setUser(data.user);

        if (data.user.role !== "admin") {
          setMessage("ليس لديك صلاحية للوصول إلى لوحة التحكم");
        }
      } else {
        console.log("Session failed, status:", res.status);
        setUser(null);
        setMessage("يجب تسجيل الدخول كمسؤول للوصول إلى هذه الصفحة");
      }
    } catch (err) {
      console.error("Session error", err);
      setUser(null);
      setMessage("حدث خطأ في التحقق من المصادقة");
    } finally {
      setSessionLoading(false);
    }
  };

  // جلب جميع السيارات
  const fetchCars = async () => {
    if (!user || user.role !== "admin") return;

    try {
      setLoading(true);
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
    fetchSession();
  }, []);

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchCars();
    }
  }, [user]);

  // تسجيل الدخول بجوجل
  const loginWithGoogle = () => {
    window.location.href = "/api/auth/google";
  };

  // تسجيل الخروج
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setMessage("تم تسجيل الخروج بنجاح");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Logout error", error);
      setMessage("حدث خطأ أثناء تسجيل الخروج");
    }
  };

  // دالة إضافة السيارة
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || user.role !== "admin") {
      setMessage("ليس لديك صلاحية لإضافة سيارات");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      let uploadedImageUrls: string[] = [...formData.imageUrls];

      if (formData.imageFiles.length > 0) {
        const newUrls = await uploadImages(formData.imageFiles);
        uploadedImageUrls = [...uploadedImageUrls, ...newUrls];

        if (newUrls.length === 0 && formData.imageFiles.length > 0) {
          throw new Error("فشل في تحميل الصور");
        }
      }

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

  // حذف سيارة
  const deleteCar = async (carId: number) => {
    if (!user || user.role !== "admin") {
      setMessage("ليس لديك صلاحية لحذف السيارات");
      return;
    }

    if (!confirm("هل أنت متأكد من أنك تريد حذف هذه السيارة؟")) {
      return;
    }

    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCars(cars.filter((car) => car.id !== carId));
        setMessage("تم حذف السيارة بنجاح");
      } else {
        const errorData = await response.json();
        setMessage(`فشل في حذف السيارة: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      setMessage("حدث خطأ أثناء حذف السيارة");
    }
  };

  // عرض تحميل أثناء جلب بيانات الجلسة
  if (sessionLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-lg text-gray-600">
          جاري التحقق من الصلاحيات...
        </p>
      </div>
    );
  }

  // إذا لم يكن المستخدم مسجلاً دخول
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">
            تسجيل الدخول مطلوب
          </h1>
          <p className="mb-6 text-gray-600 text-center">
            يجب تسجيل الدخول كمسؤول للوصول إلى لوحة التحكم
          </p>
          <button
            onClick={loginWithGoogle}
            className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-200 font-medium"
          >
            تسجيل الدخول باستخدام Google
          </button>
        </div>
      </div>
    );
  }

  // إذا كان المستخدم مسجلاً ولكن ليس admin
  if (user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              غير مصرح بالوصول
            </h1>
          </div>
          <p className="text-gray-600 mb-6 text-center">
            عذراً، <strong>{user.name || user.email}</strong>
            <br />
            ليس لديك صلاحية للوصول إلى لوحة التحكم الإدارية.
          </p>
          <div className="space-y-3">
            <button
              onClick={logout}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
            >
              تسجيل الخروج
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition duration-200"
            >
              العودة للصفحة الرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  // إذا كان المستخدم admin - عرض لوحة التحكم
  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">
                لوحة تحكم الإدارة
              </h1>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-800">
                  {user.name || user.email}
                </p>
                <p className="text-sm text-gray-600">مسؤول النظام</p>
              </div>
              {user.image && (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <button
                onClick={logout}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto p-4">
        {message && (
          <div
            className={`p-4 mb-6 rounded-lg ${
              message.includes("نجاح") || message.includes("تم")
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{message}</span>
              <button onClick={() => setMessage("")} className="text-xl">
                ×
              </button>
            </div>
          </div>
        )}

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-gray-800">
                  {cars.length}
                </p>
                <p className="text-gray-600">إجمالي السيارات</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-gray-800">
                  {cars.filter((car) => car.status === "available").length}
                </p>
                <p className="text-gray-600">السيارات المتاحة</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-gray-800">
                  {cars.filter((car) => car.status === "sold").length}
                </p>
                <p className="text-gray-600">السيارات المباعة</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* نموذج إضافة سيارة */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              إضافة سيارة جديدة
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    الماركة
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل الماركة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    الموديل
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل الموديل"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  الوصف
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="أدخل وصف السيارة"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="أدخل عدد الكيلومترات"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    الحالة
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="available">متاح</option>
                    <option value="sold">تم البيع</option>
                    <option value="reserved">محجوز</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  صور السيارة
                </label>

                <div className="mb-4">
                  <p className="text-sm mb-2 text-gray-600">رفع ملفات الصور:</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                  />
                </div>

                <div className="mb-4">
                  <p className="text-sm mb-2 text-gray-600">
                    أو إضافة روابط صور:
                  </p>
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                  >
                    + إضافة رابط صورة
                  </button>
                </div>

                {formData.imageFiles.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm mb-2 text-gray-600">
                      الملفات المرفوعة:
                    </p>
                    <div className="space-y-2">
                      {formData.imageFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index}`}
                              width={48}
                              height={48}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <span className="text-sm text-gray-700 truncate max-w-xs">
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index, "files")}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            حذف
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData.imageUrls.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm mb-2 text-gray-600">روابط الصور:</p>
                    <div className="space-y-2">
                      {formData.imageUrls.map((url, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <span className="text-sm text-gray-700 truncate max-w-xs">
                            {url}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeImage(index, "urls")}
                            className="text-red-500 hover:text-red-700 p-1"
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
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 transition duration-200 font-medium"
              >
                {loading ? "جاري الإضافة..." : "إضافة السيارة"}
              </button>
            </form>
          </div>

          {/* قائمة السيارات */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                قائمة السيارات
              </h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {cars.length} سيارة
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="mr-2 text-gray-600">
                  جاري تحميل السيارات...
                </span>
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
                <p className="text-gray-500">لا توجد سيارات مضافة بعد.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {car.brand} {car.model}
                          </h3>
                          <button
                            onClick={() => deleteCar(car.id!)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="حذف السيارة"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="text-gray-600 mb-2">{car.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>
                            الكيلومترات: {car.kilometers.toLocaleString()}
                          </span>
                          <span
                            className={`inline-block px-2 py-1 rounded ${
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
                      </div>

                      {car.images && car.images.length > 0 && (
                        <Image
                          src={car.images[0]}
                          alt={`${car.brand} ${car.model}`}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg mr-4"
                        />
                      )}
                    </div>

                    {car.images && car.images.length > 1 && (
                      <div className="mt-3 flex space-x-2 overflow-x-auto">
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
      </main>
    </div>
  );
}
