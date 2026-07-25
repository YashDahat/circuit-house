import { useForm } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { Root as CheckboxRoot } from '@radix-ui/react-checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import type { MenuItemCategory, MenuItemDto } from '@/types/menu';

interface MenuItemFormProps {
  initialData?: MenuItemDto;
  categories: MenuItemCategory[];
  onSubmit: (item: MenuItemDto) => void;
  onCancel: () => void;
}

interface MenuItemFormValues {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryName: string;
  active: boolean;
}

export function MenuItemForm({ initialData, categories, onSubmit, onCancel }: MenuItemFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<MenuItemFormValues>({
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      price: initialData?.price ?? 0,
      imageUrl: initialData?.imageUrl ?? '',
      categoryName: initialData?.categoryName ?? '',
      active: initialData?.active ?? true,
    },
  });

  const active = watch('active');

  const handleFormSubmit = (values: MenuItemFormValues) => {
    onSubmit({
      id: initialData?.id ?? null,
      name: values.name,
      description: values.description ?? null,
      price: values.price,
      imageUrl: values.imageUrl ?? null,
      categoryName: values.categoryName,
      active: values.active,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</Label>
        <Input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</Label>
        <Input
          id="description"
          type="text"
          {...register('description')}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <Label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register('price', {
            required: 'Price is required',
            min: { value: 0.01, message: 'Price must be greater than 0' },
            valueAsNumber: true,
          })}
          className="mt-1 block w-full"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <Label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</Label>
        <Input
          id="imageUrl"
          type="text"
          {...register('imageUrl')}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <Label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category</Label>
        <Select
          value={watch('categoryName')}
          onValueChange={(value: string) => setValue('categoryName', value)}
        >
          <SelectTrigger className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50">
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name ?? ''} className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100">
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryName && <p className="text-red-500 text-sm mt-1">{errors.categoryName.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <CheckboxRoot
          id="active"
          checked={active}
          onCheckedChange={(checked) => setValue('active', checked as boolean)}
          className="flex h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#D69E2E] data-[state=checked]:text-primary-foreground"
        >
          <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {active && <polyline points="20 6 9 17 4 12" />}
          </svg>
        </CheckboxRoot>
        <Label htmlFor="active" className="text-sm font-medium text-gray-700">Active</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#D69E2E] hover:bg-[#B78727] text-white">
          Save
        </Button>
      </div>
    </form>
  );
}
