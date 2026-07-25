import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { EventDto } from '@/types/event';

const eventFormSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  active: z.boolean().default(true),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  initialData?: EventDto;
  onSubmit: (data: EventFormValues) => void;
  isSubmitting: boolean;
}

export function EventForm({ initialData, onSubmit, isSubmitting }: EventFormProps) {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      date: initialData?.date ?? '',
      time: initialData?.time ?? '',
      imageUrl: initialData?.imageUrl ?? '',
      active: initialData?.active ?? true,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Event Name</Label>
        <Input id="name" {...form.register('name')} />
        {form.formState.errors.name && (
          <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...form.register('description')} />
        {form.formState.errors.description && (
          <p className="text-red-500 text-sm">{form.formState.errors.description.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...form.register('date')} />
        {form.formState.errors.date && (
          <p className="text-red-500 text-sm">{form.formState.errors.date.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="time">Time</Label>
        <Input id="time" type="time" {...form.register('time')} />
        {form.formState.errors.time && (
          <p className="text-red-500 text-sm">{form.formState.errors.time.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" {...form.register('imageUrl')} />
        {form.formState.errors.imageUrl && (
          <p className="text-red-500 text-sm">{form.formState.errors.imageUrl.message}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="active"
          checked={form.watch('active')}
          onCheckedChange={(checked) => form.setValue('active', checked as boolean)}
        />
        <Label htmlFor="active">Active</Label>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Event'}
      </Button>
    </form>
  );
}