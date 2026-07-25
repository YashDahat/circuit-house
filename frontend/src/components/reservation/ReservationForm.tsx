"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReservation } from "@/hooks/useReservations";
import type { CreateReservationRequest, ReservationResponse } from "@/types/reservation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  reservationTime: z.string().min(1, "Reservation time is required"),
  numberOfGuests: z.coerce.number().min(1, "Number of guests must be at least 1"),
  notes: z.string().optional(),
});

interface ReservationFormProps {
  onSuccess: (reservation: ReservationResponse) => void;
}

export function ReservationForm({ onSuccess }: ReservationFormProps) {
  const { mutate, isPending, isError, error } = useCreateReservation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      reservationTime: "",
      numberOfGuests: 1,
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const reservationRequest: CreateReservationRequest = {
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerPhone: values.customerPhone,
      reservationTime: values.reservationTime,
      numberOfGuests: values.numberOfGuests,
      notes: values.notes,
    };

    mutate(reservationRequest, {
      onSuccess: (data) => {
        toast.success("Reservation created successfully!");
        onSuccess(data);
        form.reset();
      },
      onError: (err) => {
        toast.error("Failed to create reservation: " + err.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
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
                <Input type="email" placeholder="your@email.com" {...field} />
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
            <FormItem>
              <FormLabel>Reservation Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
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
                <Input type="number" {...field} />
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
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any special requests?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Book Reservation"
          )}
        </Button>
        {isError && (
          <p className="text-red-500 text-sm mt-2">Error: {error?.message}</p>
        )}
      </form>
    </Form>
  );
}