export interface Service {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  description: { en: string; ar: string };
  url: string;
  category: 'rides' | 'shopping' | 'food' | 'cinemas' | 'hotels' | 'flights' | 'transport' | 'attractions';
}

export interface VIPPlan {
  id: string;
  name: { en: string; ar: string };
  price: { en: string; ar: string };
  benefits: { en: string[]; ar: string[] };
  color: string;
}

export interface Booking {
  id?: string;
  name: string;
  phone: string;
  address: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: any;
}

export type Language = 'en' | 'ar';
export type Tab = 'home' | 'services' | 'lifestyle' | 'vip';
