'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MenuItemDto, MenuItemCategoryDto } from '@/types/menu';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  categoryId: z.coerce.number().min(1, 'Category is required'),
});

interface MenuItemFormProps {
  initialData?: MenuItemDto;
  categories: MenuItemCategoryDto[];
  onSubmit: (data: MenuItemDto) => void;
  onCancel: () => void;
}

export function MenuItemForm({
  initialData,
  categories,
  onSubmit,
  onCancel,
}: MenuItemFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      categoryId: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name ?? '',
        description: initialData.description ?? '',
        price: initialData.price ?? 0,
        imageUrl: initialData.imageUrl ?? '',
        categoryId: initialData.categoryId ?? 0,
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      id: initialData?.id ?? null,
      name: values.name,
      description: values.description ?? null,
      price: values.price,
      imageUrl: values.imageUrl ?? null,
      categoryId: values.categoryId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Menu Item Name"
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description of the menu item"
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Category</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
                <FormControl>
                  <SelectTrigger className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-[#2D3748] font-semibold rounded-md px-4 py-2 transition-all duration-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200"
          >
            {initialData ? 'Save Changes' : 'Create Menu Item'}
          </Button>
        </div>
      </form>
    </Form>
  );
}