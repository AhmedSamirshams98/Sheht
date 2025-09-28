export interface CarResponse {
  id: number;
  brand: string;
  model: string;
  description?: string;
  kilometers?: number;
  status: string;
  created_at: string;
  updated_at: string;
  images: string[];
}

export interface CreateCarInput {
  brand: string;
  model: string;
  description?: string;
  kilometers?: number;
  status?: string;
  images?: string[];
}