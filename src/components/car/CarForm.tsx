import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Car } from '../../types';

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

interface CarFormProps {
  initialData?: Car;
  onSubmit: (data: CarFormData) => void;
}

export function CarForm({ initialData, onSubmit }: CarFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            {...register('title')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            {...register('image')}
            type="url"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
        </div>

        {/* Add other form fields similarly */}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description Points</label>
        {[0, 1, 2, 3, 4].map((index) => (
          <input
            key={index}
            {...register(`description.${index}`)}
            type="text"
            placeholder={`Description point ${index + 1}`}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {initialData ? 'Update Car' : 'Add Car'}
      </button>
    </form>
  );
}