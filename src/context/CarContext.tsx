import { createContext, useContext, useState, ReactNode } from 'react';
import { Car } from '../types';

interface CarContextType {
  cars: Car[];
  filteredCars: Car[];
  addCar: (car: Omit<Car, 'id'>) => void;
  editCar: (car: Car) => void;
  deleteCars: (ids: string[]) => void;
  filterCars: (filters: {
    price?: [number, number];
    colors?: string[];
    mileage?: [number, number];
  }) => void;
}

const CarContext = createContext<CarContextType | null>(null);

// Sample initial cars data
const initialCars: Car[] = [
  {
    id: '1',
    title: 'Honda City 2020',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000',
    price: 850000,
    color: 'Silver',
    mileage: 18,
    year: 2020,
    model: 'City',
    manufacturer: 'Honda',
    description: [
      'Single owner vehicle',
      'Regular service history',
      'New tires installed',
      'Zero accidents',
      'All original parts'
    ],
    kmDriven: 45000,
    majorScratches: false,
    originalPaint: true,
    accidents: 0,
    previousBuyers: 1,
    registrationPlace: 'Mumbai'
  },
  {
    id: '2',
    title: 'Toyota Fortuner 2019',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000',
    price: 2800000,
    color: 'White',
    mileage: 12,
    year: 2019,
    model: 'Fortuner',
    manufacturer: 'Toyota',
    description: [
      'Well maintained',
      'Premium features',
      'Comprehensive insurance',
      'Recently serviced',
      'All documents clear'
    ],
    kmDriven: 65000,
    majorScratches: false,
    originalPaint: true,
    accidents: 0,
    previousBuyers: 1,
    registrationPlace: 'Delhi'
  }
];

export function CarProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [filteredCars, setFilteredCars] = useState<Car[]>(initialCars);

  const addCar = (carData: Omit<Car, 'id'>) => {
    const newCar = {
      ...carData,
      id: Math.random().toString(),
    };
    const updatedCars = [...cars, newCar];
    setCars(updatedCars);
    setFilteredCars(updatedCars);
  };

  const editCar = (updatedCar: Car) => {
    const updatedCars = cars.map(car => 
      car.id === updatedCar.id ? updatedCar : car
    );
    setCars(updatedCars);
    setFilteredCars(updatedCars);
  };

  const deleteCars = (ids: string[]) => {
    const updatedCars = cars.filter(car => !ids.includes(car.id));
    setCars(updatedCars);
    setFilteredCars(updatedCars);
  };

  const filterCars = (filters: {
    price?: [number, number];
    colors?: string[];
    mileage?: [number, number];
  }) => {
    let filtered = [...cars];

    if (filters.price) {
      filtered = filtered.filter(
        car => car.price >= filters.price![0] && car.price <= filters.price![1]
      );
    }

    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter(car => 
        filters.colors!.includes(car.color)
      );
    }

    if (filters.mileage) {
      filtered = filtered.filter(
        car => car.mileage >= filters.mileage![0] && car.mileage <= filters.mileage![1]
      );
    }

    setFilteredCars(filtered);
  };

  return (
    <CarContext.Provider value={{ 
      cars: filteredCars, 
      filteredCars, 
      addCar, 
      editCar, 
      deleteCars,
      filterCars 
    }}>
      {children}
    </CarContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
}