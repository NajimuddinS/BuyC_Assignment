import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCars } from '../../context/CarContext';

const carSchema = z.object({
  title: z.string().min(3),
  image: z.string().url(),
  price: z.number().positive(),
  color: z.string(),
  mileage: z.number().positive(),
  year: z.number().min(1900).max(new Date().getFullYear()),
  model: z.string(),
  manufacturer: z.string(),
  description: z.array(z.string()).length(5),
  kmDriven: z.number().positive(),
  majorScratches: z.boolean(),
  originalPaint: z.boolean(),
  accidents: z.number().min(0),
  previousBuyers: z.number().min(0),
  registrationPlace: z.string(),
});

type CarFormData = z.infer<typeof carSchema>;

export function CarForm() {
  const { addCar } = useCars();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      description: ['', '', '', '', ''],
      majorScratches: false,
      originalPaint: true,
      accidents: 0,
      previousBuyers: 0,
    },
  });

  const onSubmit = (data: CarFormData) => {
    addCar(data);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              {...register('image')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              {...register('price', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              {...register('color')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mileage (km/l)</label>
            <input
              type="number"
              {...register('mileage', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.mileage && <p className="mt-1 text-sm text-red-600">{errors.mileage.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              {...register('year', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              {...register('model')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
            <input
              type="text"
              {...register('manufacturer')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.manufacturer && <p className="mt-1 text-sm text-red-600">{errors.manufacturer.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">KMs Driven</label>
            <input
              type="number"
              {...register('kmDriven', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.kmDriven && <p className="mt-1 text-sm text-red-600">{errors.kmDriven.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Place</label>
            <input
              type="text"
              {...register('registrationPlace')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.registrationPlace && <p className="mt-1 text-sm text-red-600">{errors.registrationPlace.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description Points</label>
          {[0, 1, 2, 3, 4].map((index) => (
            <input
              key={index}
              {...register(`description.${index}`)}
              type="text"
              placeholder={`Description point ${index + 1}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          ))}
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('majorScratches')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Major Scratches</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('originalPaint')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Original Paint</label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Accidents</label>
            <input
              type="number"
              {...register('accidents', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.accidents && <p className="mt-1 text-sm text-red-600">{errors.accidents.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Previous Buyers</label>
            <input
              type="number"
              {...register('previousBuyers', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.previousBuyers && <p className="mt-1 text-sm text-red-600">{errors.previousBuyers.message}</p>}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
}