import { useState } from 'react';
import { Car } from '../../types';
import { Trash2, Edit } from 'lucide-react';

interface CarListProps {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (ids: string[]) => void;
  isDealer: boolean;
}

export function CarList({ cars, onEdit, onDelete, isDealer }: CarListProps) {
  const [selectedCars, setSelectedCars] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedCars(prev => 
      prev.includes(id) 
        ? prev.filter(carId => carId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {isDealer && selectedCars.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={() => onDelete(selectedCars)}
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-900"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected ({selectedCars.length})
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div key={car.id} className="relative bg-white rounded-lg shadow-md overflow-hidden">
            {isDealer && (
              <input
                type="checkbox"
                checked={selectedCars.includes(car.id)}
                onChange={() => toggleSelect(car.id)}
                className="absolute top-2 right-2 h-4 w-4"
              />
            )}
            
            <img
              src={car.image}
              alt={car.title}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-4">
              <h3 className="text-lg font-semibold">{car.title}</h3>
              <p className="text-gray-600">{car.manufacturer} {car.model} ({car.year})</p>
              
              <div className="mt-2">
                <p className="text-2xl font-bold">₹{car.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{car.kmDriven.toLocaleString()} km driven</p>
              </div>

              <ul className="mt-4 space-y-1">
                {car.description.map((point, index) => (
                  <li key={index} className="text-sm text-gray-600">• {point}</li>
                ))}
              </ul>

              {isDealer && (
                <button
                  onClick={() => onEdit(car)}
                  className="mt-4 flex items-center text-blue-600 hover:text-blue-900"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}