import { useState } from 'react';
import { cn } from '../../lib/utils';

interface FilterProps {
  onFilterChange: (filters: {
    price?: [number, number];
    colors?: string[];
    mileage?: [number, number];
  }) => void;
}

export function CarFilters({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState({
    price: [0, 1000000],
    colors: [] as string[],
    mileage: [0, 100],
  });

  const colors = ['Red', 'Blue', 'Black', 'White', 'Silver', 'Grey'];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Price Range</h3>
        <div className="mt-2 space-y-2">
          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={filters.price[1]}
            onChange={(e) => handleFilterChange('price', [filters.price[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{filters.price[0].toLocaleString()}</span>
            <span>₹{filters.price[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Colors</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                const newColors = filters.colors.includes(color)
                  ? filters.colors.filter((c) => c !== color)
                  : [...filters.colors, color];
                handleFilterChange('colors', newColors);
              }}
              className={cn(
                'px-3 py-1 rounded-full text-sm',
                filters.colors.includes(color)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Mileage (km/l)</h3>
        <div className="mt-2 space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={filters.mileage[1]}
            onChange={(e) => handleFilterChange('mileage', [filters.mileage[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{filters.mileage[0]} km/l</span>
            <span>{filters.mileage[1]} km/l</span>
          </div>
        </div>
      </div>
    </div>
  );
}