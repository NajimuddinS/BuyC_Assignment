export interface Car {
  id: string;
  title: string;
  image: string;
  price: number;
  color: string;
  mileage: number;
  year: number;
  model: string;
  manufacturer: string;
  description: string[];
  kmDriven: number;
  majorScratches: boolean;
  originalPaint: boolean;
  accidents: number;
  previousBuyers: number;
  registrationPlace: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'dealer' | 'buyer';
}