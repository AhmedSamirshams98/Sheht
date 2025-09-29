export interface Car {
  id?: number;
  brand: string;
  model: string;
  year: number; // تأكد من وجوده
  condition: string; // تأكد من وجوده
  description: string;
  kilometers: number;
  status: string;
  images: string[];
  created_at?: string;
  updated_at?: string;
}
export interface CarResponse {
  id: number;
  brand: string;
  model: string;
  year: number; // إضافة
  condition: string; // إضافة
  description?: string;
  kilometers?: number;
  status: string;
  images: string[];
  created_at: string;
  updated_at: string;
}