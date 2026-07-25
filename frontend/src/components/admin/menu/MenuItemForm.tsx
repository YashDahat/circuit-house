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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { MenuItemCategory, MenuItemDto } from '@/types/menu';

const menuItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  category: z.nativeEnum<MenuItemCategory>(['APPETIZER', 'MAIN_COURSE', 'DESSERT', 'BEVERAGE', 'SALAD', 'SIDE', 'DRINK']),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

interface MenuItemFormProps {
  initialData?: MenuItemDto;
  onSubmit: (data: MenuItemFormValues) => void;
  onCancel: () => void;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      price: initialData?.price ?? 0,
      category: initialData?.category ?? 'MAIN_COURSE',
      imageUrl: initialData?.imageUrl ?? '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Menu Item Name" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description of the menu item" {...field} />
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
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="APPETIZER">Appetizer</SelectItem>
                  <SelectItem value="MAIN_COURSE">Main Course</SelectItem>
                  <SelectItem value="DESSERT">Dessert</SelectItem>
                  <SelectItem value="BEVERAGE">Beverage</SelectItem>
                  <SelectItem value="SALAD">Salad</SelectItem>
                  <SelectItem value="SIDE">Side</SelectItem>
                  <SelectItem value="DRINK">Drink</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update Item' : 'Create Item'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MenuItemForm;