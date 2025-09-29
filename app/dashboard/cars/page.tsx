// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useCarStore, Car } from "@/stores/carStore";
// import HomeCars from "../components/HomeComponents/HomeCars";
// import { Button } from "../components/ui/Button";

// interface CarFormData {
//   brand: string;
//   model: string;
//   year: number;
//   condition: string;
//   description: string;
//   kilometers: number;
//   status: string;
//   imageFiles: File[];
//   imageUrls: string[];
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   image?: string;
// }

// export default function Dashboard() {
//   const {
//     cars,
//     loading: storeLoading,
//     error: storeError,
//     fetchCars,
//     createCar,
//     updateCar,
//     // deleteCar,
//     clearError,
//   } = useCarStore();

//   const [user, setUser] = useState<User | null>(null);
//   const [editingCar, setEditingCar] = useState<Car | null>(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState<CarFormData>({
//     brand: "",
//     model: "",
//     year: new Date().getFullYear(),
//     condition: "جديدة",
//     description: "",
//     kilometers: 0,
//     status: "available",
//     imageFiles: [],
//     imageUrls: [],
//   });

//   const [editFormData, setEditFormData] = useState<CarFormData>({
//     brand: "",
//     model: "",
//     year: new Date().getFullYear(),
//     condition: "جديدة",
//     description: "",
//     kilometers: 0,
//     status: "available",
//     imageFiles: [],
//     imageUrls: [],
//   });

//   // جلب بيانات الجلسة والتحقق من الصلاحيات
//   const fetchSession = async () => {
//     try {
//       const res = await fetch("/api/auth/me", {
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("Session response status:", res.status);

//       if (res.ok) {
//         const data = await res.json();
//         console.log("Session data:", data);
//         setUser(data.user);

//         if (data.user.role !== "admin") {
//           setMessage("ليس لديك صلاحية للوصول إلى لوحة التحكم");
//         }
//       } else {
//         console.log("Session failed, status:", res.status);
//         setUser(null);
//         setMessage("يجب تسجيل الدخول كمسؤول للوصول إلى هذه الصفحة");
//       }
//     } catch (err) {
//       console.error("Session error", err);
//       setUser(null);
//       setMessage("حدث خطأ في التحقق من المصادقة");
//     } finally {
//       setSessionLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSession();
//   }, []);

//   useEffect(() => {
//     if (user && user.role === "admin") {
//       fetchCars();
//     }
//   }, [user, fetchCars]);

//   // عرض الرسائل من الـ store
//   useEffect(() => {
//     if (storeError) {
//       setMessage(storeError);
//     }
//   }, [storeError]);

//   // تسجيل الدخول بجوجل
//   const loginWithGoogle = () => {
//     window.location.href = "/api/auth/google";
//   };

//   // تسجيل الخروج
//   const logout = async () => {
//     try {
//       await fetch("/api/auth/logout", { method: "POST" });
//       setUser(null);
//       setMessage("تم تسجيل الخروج بنجاح");
//       setTimeout(() => {
//         window.location.reload();
//       }, 1000);
//     } catch (error) {
//       console.error("Logout error", error);
//       setMessage("حدث خطأ أثناء تسجيل الخروج");
//     }
//   };

//   // دالة تحميل الصور
//   const uploadImages = async (imageFiles: File[]): Promise<string[]> => {
//     if (imageFiles.length === 0) return [];

//     try {
//       const uploadFormData = new FormData();
//       imageFiles.forEach((file) => {
//         uploadFormData.append("images", file);
//       });

//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: uploadFormData,
//       });

//       if (response.ok) {
//         return await response.json();
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "فشل في تحميل الصور");
//       }
//     } catch (error) {
//       console.error("Error uploading images:", error);
//       throw error;
//     }
//   };

//   // دالة إضافة السيارة
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!user || user.role !== "admin") {
//       setMessage("ليس لديك صلاحية لإضافة سيارات");
//       return;
//     }

//     setMessage("");

//     try {
//       let uploadedImageUrls: string[] = [...formData.imageUrls];

//       if (formData.imageFiles.length > 0) {
//         const newUrls = await uploadImages(formData.imageFiles);
//         uploadedImageUrls = [...uploadedImageUrls, ...newUrls];
//       }

//       await createCar({
//         brand: formData.brand,
//         model: formData.model,
//         year: formData.year,
//         condition: formData.condition,
//         description: formData.description,
//         kilometers: formData.kilometers,
//         status: formData.status,
//         images: uploadedImageUrls,
//       });

//       setFormData({
//         brand: "",
//         model: "",
//         year: new Date().getFullYear(),
//         condition: "جديدة",
//         description: "",
//         kilometers: 0,
//         status: "available",
//         imageFiles: [],
//         imageUrls: [],
//       });
//       setMessage("تم إضافة السيارة بنجاح!");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setMessage(
//         error instanceof Error ? error.message : "حدث خطأ في الاتصال بالخادم"
//       );
//     } finally {
//       setTimeout(() => setMessage(""), 5000);
//     }
//   };

//   // دالة إضافة الصور
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     const newImages = Array.from(files);
//     if (isEditing) {
//       setEditFormData((prev) => ({
//         ...prev,
//         imageFiles: [...prev.imageFiles, ...newImages],
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         imageFiles: [...prev.imageFiles, ...newImages],
//       }));
//     }
//   };

//   // دالة حذف صورة
//   const removeImage = (index: number, type: "files" | "urls") => {
//     if (isEditing) {
//       setEditFormData((prev) => {
//         if (type === "files") {
//           const updatedFiles = [...prev.imageFiles];
//           updatedFiles.splice(index, 1);
//           return { ...prev, imageFiles: updatedFiles };
//         } else {
//           const updatedUrls = [...prev.imageUrls];
//           updatedUrls.splice(index, 1);
//           return { ...prev, imageUrls: updatedUrls };
//         }
//       });
//     } else {
//       setFormData((prev) => {
//         if (type === "files") {
//           const updatedFiles = [...prev.imageFiles];
//           updatedFiles.splice(index, 1);
//           return { ...prev, imageFiles: updatedFiles };
//         } else {
//           const updatedUrls = [...prev.imageUrls];
//           updatedUrls.splice(index, 1);
//           return { ...prev, imageUrls: updatedUrls };
//         }
//       });
//     }
//   };

//   // دالة إضافة رابط صورة يدوياً
//   const addImageUrl = () => {
//     const url = prompt("أدخل رابط الصورة:");
//     if (url && url.trim() !== "") {
//       if (isEditing) {
//         setEditFormData((prev) => ({
//           ...prev,
//           imageUrls: [...prev.imageUrls, url.trim()],
//         }));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           imageUrls: [...prev.imageUrls, url.trim()],
//         }));
//       }
//     }
//   };

//   // حذف سيارة
//   // const handleDeleteCar = async (carId: number) => {
//   //   if (!user || user.role !== "admin") {
//   //     setMessage("ليس لديك صلاحية لحذف السيارات");
//   //     return;
//   //   }

//   //   if (!confirm("هل أنت متأكد من أنك تريد حذف هذه السيارة؟")) {
//   //     return;
//   //   }

//   //   try {
//   //     await deleteCar(carId);
//   //     setMessage("تم حذف السيارة بنجاح");
//   //   } catch (error) {
//   //     console.error("Error deleting car:", error);
//   //     setMessage("حدث خطأ أثناء حذف السيارة");
//   //   }
//   // };

//   // بدء التعديل على سيارة
//   // const startEdit = (car: Car) => {
//   //   setEditingCar(car);
//   //   setIsEditing(true);
//   //   setEditFormData({
//   //     brand: car.brand,
//   //     model: car.model,
//   //     year: car.year,
//   //     condition: car.condition,
//   //     description: car.description,
//   //     kilometers: car.kilometers,
//   //     status: car.status,
//   //     imageFiles: [],
//   //     imageUrls: [...car.images],
//   //   });
//   // };

//   // إلغاء التعديل
//   const cancelEdit = () => {
//     setEditingCar(null);
//     setIsEditing(false);
//     setEditFormData({
//       brand: "",
//       model: "",
//       year: new Date().getFullYear(),
//       condition: "جديدة",
//       description: "",
//       kilometers: 0,
//       status: "available",
//       imageFiles: [],
//       imageUrls: [],
//     });
//     clearError();
//   };

//   // حفظ التعديلات
//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!user || user.role !== "admin" || !editingCar) {
//       setMessage("ليس لديك صلاحية لتعديل السيارات");
//       return;
//     }

//     setMessage("");

//     try {
//       let uploadedImageUrls: string[] = [...editFormData.imageUrls];

//       // تحميل الصور الجديدة إذا وجدت
//       if (editFormData.imageFiles.length > 0) {
//         const newUrls = await uploadImages(editFormData.imageFiles);
//         uploadedImageUrls = [...uploadedImageUrls, ...newUrls];
//       }

//       await updateCar(editingCar.id!, {
//         brand: editFormData.brand,
//         model: editFormData.model,
//         year: editFormData.year,
//         condition: editFormData.condition,
//         description: editFormData.description,
//         kilometers: editFormData.kilometers,
//         status: editFormData.status,
//         images: uploadedImageUrls,
//       });

//       setMessage("تم تعديل السيارة بنجاح!");
//       cancelEdit();
//     } catch (error) {
//       console.error("Error updating car:", error);
//       setMessage(
//         error instanceof Error ? error.message : "حدث خطأ في الاتصال بالخادم"
//       );
//     } finally {
//       setTimeout(() => setMessage(""), 5000);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//           <h1 className="text-2xl font-bold mb-4 text-center">
//             تسجيل الدخول مطلوب
//           </h1>
//           <p className="mb-6 text-gray-600 text-center">
//             يجب تسجيل الدخول كمسؤول للوصول إلى لوحة التحكم
//           </p>
//           <button
//             className="bg-[#fdba00] cursor-pointer w-full p-2 rounded-[26px] text-white"
//             onClick={loginWithGoogle}
//           >
//             تسجيل الدخول باستخدام Google
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className=" bg-gray-50 overflow-hidden p-2 ">
//       {/* الهيدر */}
//       <header className="bg-white flex flex-col md:flex-row items-center  mb-[4%]">
//         <div className="flex flex-col md:flex-row  items-center  justify-center md:justify-between px-[8%] w-full ">
//           <div className="text-right flex items-center justify-center flex-col">
//             <p
//               className="font-medium text-center text-gray-800"
//               style={{ direction: "rtl" }}
//             >
//               مرحبا : {user.name || user.email}
//             </p>
//             <Button kind="primaryspeciallogout" onClick={logout} className="">
//               تسجيل الخروج
//             </Button>
//           </div>
//           <h1 className=" text-center md:text-right font-bold text-gray-800">
//             لوحة تحكم السيارات
//           </h1>
//         </div>
//       </header>

//       {/* المحتوى الرئيسي */}
//       <main className="">
//         <div
//           className="flex flex-col gap-8 px-[8%]"
//           style={{ direction: "rtl" }}
//         >
//           {/* نموذج إضافة/تعديل سيارة */}
//           <div className="bg-white p-6 rounded-lg shadow-sm border">
//             <h2 className="text-xl font-semibold mb-4 text-center md:text-right text-gray-800">
//               {isEditing
//                 ? `تعديل السيارة: ${editingCar?.brand} ${editingCar?.model}`
//                 : "إضافة سيارة جديدة"}
//             </h2>

//             <form
//               onSubmit={isEditing ? handleEditSubmit : handleSubmit}
//               className="space-y-4"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-700">
//                     الماركة
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={isEditing ? editFormData.brand : formData.brand}
//                     onChange={(e) =>
//                       isEditing
//                         ? setEditFormData({
//                             ...editFormData,
//                             brand: e.target.value,
//                           })
//                         : setFormData({ ...formData, brand: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="أدخل الماركة"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-700">
//                     الموديل
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={isEditing ? editFormData.model : formData.model}
//                     onChange={(e) =>
//                       isEditing
//                         ? setEditFormData({
//                             ...editFormData,
//                             model: e.target.value,
//                           })
//                         : setFormData({ ...formData, model: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="أدخل الموديل"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-700">
//                     السنة
//                   </label>
//                   <input
//                     type="number"
//                     required
//                     value={isEditing ? editFormData.year : formData.year}
//                     onChange={(e) =>
//                       isEditing
//                         ? setEditFormData({
//                             ...editFormData,
//                             year:
//                               parseInt(e.target.value) ||
//                               new Date().getFullYear(),
//                           })
//                         : setFormData({
//                             ...formData,
//                             year:
//                               parseInt(e.target.value) ||
//                               new Date().getFullYear(),
//                           })
//                     }
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="أدخل سنة الصنع"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-700">
//                     الحالة
//                   </label>
//                   <select
//                     value={
//                       isEditing ? editFormData.condition : formData.condition
//                     }
//                     onChange={(e) =>
//                       isEditing
//                         ? setEditFormData({
//                             ...editFormData,
//                             condition: e.target.value,
//                           })
//                         : setFormData({
//                             ...formData,
//                             condition: e.target.value,
//                           })
//                     }
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="جديدة">جديدة</option>
//                     <option value="مستعملة">مستعملة</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700">
//                   الوصف
//                 </label>
//                 <textarea
//                   value={
//                     isEditing ? editFormData.description : formData.description
//                   }
//                   onChange={(e) =>
//                     isEditing
//                       ? setEditFormData({
//                           ...editFormData,
//                           description: e.target.value,
//                         })
//                       : setFormData({
//                           ...formData,
//                           description: e.target.value,
//                         })
//                   }
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   rows={3}
//                   placeholder="أدخل وصف السيارة"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-700">
//                     عدد الكيلومترات
//                   </label>
//                   <input
//                     type="number"
//                     value={
//                       isEditing ? editFormData.kilometers : formData.kilometers
//                     }
//                     onChange={(e) =>
//                       isEditing
//                         ? setEditFormData({
//                             ...editFormData,
//                             kilometers: parseInt(e.target.value) || 0,
//                           })
//                         : setFormData({
//                             ...formData,
//                             kilometers: parseInt(e.target.value) || 0,
//                           })
//                     }
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="أدخل عدد الكيلومترات"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-700">
//                     حالة العرض
//                   </label>
//                   <select
//                     value={isEditing ? editFormData.status : formData.status}
//                     onChange={(e) =>
//                       isEditing
//                         ? setEditFormData({
//                             ...editFormData,
//                             status: e.target.value,
//                           })
//                         : setFormData({ ...formData, status: e.target.value })
//                     }
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="available">متاح</option>
//                     <option value="sold">تم البيع</option>
//                     <option value="reserved">محجوز</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700">
//                   صور السيارة
//                 </label>

//                 <div className="mb-4">
//                   <p className="text-sm mb-2 text-gray-600">رفع ملفات الصور:</p>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="w-full p-2 border border-gray-300 rounded-lg mb-2"
//                   />
//                 </div>

//                 {(isEditing ? editFormData.imageFiles : formData.imageFiles)
//                   .length > 0 && (
//                   <div className="mt-4">
//                     <p className="text-sm mb-2 text-gray-600">
//                       الملفات المرفوعة:
//                     </p>
//                     <div className="space-y-2">
//                       {(isEditing
//                         ? editFormData.imageFiles
//                         : formData.imageFiles
//                       ).map((file, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <Image
//                               src={URL.createObjectURL(file)}
//                               alt={`Preview ${index}`}
//                               width={48}
//                               height={48}
//                               className="w-12 h-12 object-cover rounded"
//                             />
//                             <span className="text-sm text-gray-700 truncate max-w-xs">
//                               {file.name}
//                             </span>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index, "files")}
//                             className="text-red-500 hover:text-red-700 p-1"
//                           >
//                             حذف
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {(isEditing ? editFormData.imageUrls : formData.imageUrls)
//                   .length > 0 && (
//                   <div className="mt-4">
//                     <p className="text-sm mb-2 text-gray-600">روابط الصور:</p>
//                     <div className="space-y-2">
//                       {(isEditing
//                         ? editFormData.imageUrls
//                         : formData.imageUrls
//                       ).map((url, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
//                         >
//                           <span className="text-sm text-gray-700 truncate max-w-xs">
//                             {url}
//                           </span>
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index, "urls")}
//                             className="text-red-500 hover:text-red-700 p-1"
//                           >
//                             حذف
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-center gap-3">
//                 <button
//                   type="submit"
//                   disabled={storeLoading}
//                   className="w-[20%] text-[1vw] bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 transition duration-200 font-medium"
//                 >
//                   {storeLoading
//                     ? "جاري الحفظ..."
//                     : isEditing
//                     ? "حفظ التعديلات"
//                     : "إضافة السيارة"}
//                 </button>

//                 {isEditing && (
//                   <button
//                     type="button"
//                     onClick={cancelEdit}
//                     className="bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition duration-200 font-medium"
//                   >
//                     إلغاء
//                   </button>
//                 )}
//               </div>
//             </form>
//           </div>

//           {/* قائمة السيارات */}
//           <div className="bg-white overflow-hidden rounded-lg shadow-sm border">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">
//                 قائمة السيارات
//               </h2>
//               <span className="bg-blue-100  px-3 py-1 rounded-full text-sm font-medium">
//                 {cars.length} سيارة
//               </span>
//             </div>

//             {storeLoading ? (
//               <div className="flex justify-center items-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                 <span className="mr-2 text-gray-600">
//                   جاري تحميل السيارات...
//                 </span>
//               </div>
//             ) : cars.length === 0 ? (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">لا توجد سيارات مضافة بعد.</p>
//               </div>
//             ) : (
//               <HomeCars isDashboard={true} />
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Car, User } from "@/types/car";
import { useCarStore } from "@/stores/carStore";
import HomeCars from "@/app/components/HomeComponents/HomeCars";

interface CarFormData extends Omit<Car, "id" | "images"> {
  imageFiles: File[]; // حالة منفصلة للملفات
}

export default function CarDashboard() {
  const { fetchCars } = useCarStore();
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<CarFormData>({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    condition: "جديدة",
    description: "",
    kilometers: 0,
    status: "available",
    imageFiles: [],
  });

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من وجود بيانات مطلوبة
    if (!formData.brand || !formData.model) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // التحقق من وجود صور
    if (formData.imageFiles.length === 0) {
      alert("يرجى إضافة صورة واحدة على الأقل للسيارة");
      return;
    }

    const form = new FormData();
    form.append("brand", formData.brand);
    form.append("model", formData.model);
    form.append("year", formData.year.toString());
    form.append("condition", formData.condition);
    form.append("description", formData.description);
    form.append("kilometers", formData.kilometers.toString());
    form.append("status", formData.status);

    // إضافة الملفات - استخدم imageFiles
    formData.imageFiles.forEach((file) => {
      form.append("images", file);
    });

    try {
      console.log("جاري إرسال البيانات...", {
        brand: formData.brand,
        model: formData.model,
        imageCount: formData.imageFiles.length,
      });

      const response = await axios.post("/api/cars", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("تم إضافة السيارة بنجاح:", response.data);

      // إعادة تعيين النموذج
      setFormData({
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        condition: "جديدة",
        description: "",
        kilometers: 0,
        status: "available",
        imageFiles: [],
      });

      // إعادة تحميل السيارات
      fetchCars();

      alert("تم إضافة السيارة بنجاح!");
    } catch (error) {
      console.error("Error adding car:", error);
      alert("حدث خطأ أثناء إضافة السيارة");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...newFiles], // ✅ استخدم imageFiles هنا
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "year" || name === "kilometers" ? parseInt(value) || 0 : value,
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Session error", err);
        setUser(null);
      }
    };

    fetchSession();
  }, []);

  const loginWithGoogle = () => {
    window.location.href = "/api/auth/google";
  };

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
            className="bg-[#fdba00] cursor-pointer w-full p-2 rounded-[26px] text-white"
            onClick={loginWithGoogle}
          >
            تسجيل الدخول باستخدام Google
          </button>
        </div>
      </div>
    );
  }
  console.log(user);
  return (
    <div className="w-full overflow-hidden min-h-screen px-[8%]" dir="rtl">
      {/* الهيدر */}
      <div className="flex flex-col w-full items-center  md:justify-between md:flex-row  "></div>
      {/* نموذج الإضافة */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
        <h2 className="text-xl mb-4">إضافة سيارة جديدة</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="brand"
            placeholder="الماركة *"
            value={formData.brand}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="text"
            name="model"
            placeholder="الموديل *"
            value={formData.model}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="number"
            name="year"
            placeholder="السنة"
            value={formData.year}
            onChange={handleInputChange}
            className="p-2 border rounded"
            min="1900"
            max={new Date().getFullYear() + 1}
          />

          <input
            type="number"
            name="kilometers"
            placeholder="الكيلومترات"
            value={formData.kilometers}
            onChange={handleInputChange}
            className="p-2 border rounded"
            min="0"
          />

          <select
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="جديدة">جديدة</option>
            <option value="مستعملة">مستعملة</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="available">متاحة</option>
            <option value="sold">مباعة</option>
            <option value="reserved">محجوزة</option>
          </select>
        </div>

        <textarea
          name="description"
          placeholder="الوصف"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mt-4"
          rows={3}
        />

        {/* عرض الملفات المختارة */}
        {formData.imageFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg mb-2">
              الصور المختارة ({formData.imageFiles.length}):
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData.imageFiles.map((file, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    ×
                  </button>
                  <p className="text-xs mt-1 truncate w-24">{file.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">
            صور السيارة * (اختر صورة واحدة على الأقل)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          إضافة سيارة
        </button>
      </form>

      {/* عرض السيارات */}
      <HomeCars isDashboard={true} />
    </div>
  );
}
