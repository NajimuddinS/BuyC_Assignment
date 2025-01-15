import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useCars } from '../../context/CarContext';
import { ArrowUpDown } from 'lucide-react';

interface FilterProps {
  onFilterChange: (filters: {
    price?: [number, number];
    colors?: string[];
    mileage?: [number, number];
  }) => void;
  onSortChange: (sort: { field: string; direction: 'asc' | 'desc' }) => void;
}

export function CarFilters({ onFilterChange, onSortChange }: FilterProps) {
  const { cars } = useCars();
  const maxPrice = Math.max(...cars.map(car => car.price));
  
  const [filters, setFilters] = useState({
    price: [0, maxPrice],
    colors: [] as string[],
    mileage: [0, 100],
  });

  const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' }>({
    field: 'price',
    direction: 'asc'
  });

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      price: [0, maxPrice]
    }));
  }, [maxPrice]);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (field: string) => {
    const newSort = {
      field,
      direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc'
    };
    setSort(newSort);
    onSortChange(newSort);
  };

  const colors = ['Red', 'Blue', 'Black', 'White', 'Silver', 'Grey'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Sort By</h3>
        <div className="flex flex-wrap gap-2">
          {['price', 'year', 'mileage'].map((field) => (
            <button
              key={field}
              onClick={() => handleSortChange(field)}
              className={cn(
                'flex items-center px-3 py-1 rounded-md text-sm capitalize',
                sort.field === field
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              )}
            >
              {field}
              {sort.field === field && (
                <ArrowUpDown className="ml-1 h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Price Range</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              max={maxPrice}
              value={filters.price[0]}
              onChange={(e) => handleFilterChange('price', [parseInt(e.target.value) || 0, filters.price[1]])}
              className="w-24 px-2 py-1 border rounded"
            />
            <span>to</span>
            <input
              type="number"
              min="0"
              max={maxPrice}
              value={filters.price[1]}
              onChange={(e) => handleFilterChange('price', [filters.price[0], parseInt(e.target.value) || maxPrice])}
              className="w-24 px-2 py-1 border rounded"
            />
          </div>
          <input
            type="range"
            min="0"
            max={maxPrice}
            step={Math.max(1000, Math.floor(maxPrice / 100))}
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
            onChange={(e) => handleFilterChange('mileage', [0, parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>0 km/l</span>
            <span>{filters.mileage[1]} km/l</span>
          </div>
        </div>
      </div>
    </div>
  );
}