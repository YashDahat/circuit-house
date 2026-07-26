'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { useCreateReservation } from '@/hooks/useReservations';
import { CreateReservationRequest } from '@/types/reservation';
import { toast } from 'sonner';

const formSchema = z.object({
  customerName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  customerEmail: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  customerPhone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.',
  }),
  reservationTime: z.date({
    required_error: 'A reservation date and time is required.',
  }),
  numberOfGuests: z.coerce.number().min(1, {
    message: 'Number of guests must be at least 1.',
  }),
  notes: z.string().optional(),
});

export function ReservationForm() {
  const { mutate: createReservation, isPending, isSuccess, isError } = useCreateReservation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      numberOfGuests: 1,
      notes: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const reservationRequest: CreateReservationRequest = {
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerPhone: values.customerPhone,
      reservationTime: values.reservationTime.toISOString(),
      numberOfGuests: values.numberOfGuests,
      notes: values.notes,
    };
    createReservation(reservationRequest, {
      onSuccess: () => {
        toast.success('Reservation created successfully!');
        form.reset();
      },
      onError: (error) => {
        toast.error('Failed to create reservation. Please try again.');
        console.error('Reservation error:', error);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="123-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reservationTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Reservation Date and Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, 'PPP HH:mm') : <span>Pick a date and time</span>}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  {/* Simple time input, could be enhanced with a time picker component */}
                  <div className="p-3 border-t">
                    <Input
                      type="time"
                      value={field.value ? format(field.value, 'HH:mm') : ''}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        const newDate = field.value ? new Date(field.value) : new Date();
                        newDate.setHours(hours, minutes);
                        field.onChange(newDate);
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberOfGuests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Guests</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requests / Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Any special requests or notes?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Make Reservation'}
        </Button>
      </form>
    </Form>
  );
}