import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { useCreateReservation } from '@/hooks/useReservations';
import { CreateReservationRequest } from '@/types/reservation';
import { toast } from 'sonner';

interface ReservationFormValues {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationTime: string;
  partySize: number;
}

const ReservationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormValues>();

  const createReservationMutation = useCreateReservation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);
    try {
      const reservationRequest: CreateReservationRequest = {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        reservationTime: data.reservationTime,
        partySize: data.partySize,
      };
      await createReservationMutation.mutateAsync(reservationRequest);
      toast.success('Reservation created successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to create reservation. Please try again.');
      console.error('Reservation creation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentDateTime = () => {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm");
  };

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-semibold mb-6 text-[#2D3748]">Make a Reservation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="customerName" className="text-[#2D3748]">Name</Label>
          <Input
            id="customerName"
            type="text"
            {...register('customerName', { required: 'Name is required' })}
            className="mt-1 block w-full"
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="customerEmail" className="text-[#2D3748]">Email</Label>
          <Input
            id="customerEmail"
            type="email"
            {...register('customerEmail', { required: 'Email is required' })}
            className="mt-1 block w-full"
          />
          {errors.customerEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="customerPhone" className="text-[#2D3748]">Phone</Label>
          <Input
            id="customerPhone"
            type="tel"
            {...register('customerPhone', {
              required: 'Phone is required',
              minLength: { value: 10, message: 'Phone number must be at least 10 digits' },
              maxLength: { value: 15, message: 'Phone number must be at most 15 digits' },
            })}
            className="mt-1 block w-full"
          />
          {errors.customerPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="reservationTime" className="text-[#2D3748]">Reservation Time</Label>
          <Input
            id="reservationTime"
            type="datetime-local"
            {...register('reservationTime', { required: 'Reservation time is required' })}
            min={getCurrentDateTime()}
            className="mt-1 block w-full"
          />
          {errors.reservationTime && (
            <p className="text-red-500 text-sm mt-1">{errors.reservationTime.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="partySize" className="text-[#2D3748]">Party Size</Label>
          <Input
            id="partySize"
            type="number"
            {...register('partySize', {
              required: 'Party size is required',
              min: { value: 1, message: 'Party size must be at least 1' },
              valueAsNumber: true,
            })}
            className="mt-1 block w-full"
          />
          {errors.partySize && (
            <p className="text-red-500 text-sm mt-1">{errors.partySize.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          disabled={isSubmitting || createReservationMutation.isPending}
        >
          {isSubmitting || createReservationMutation.isPending ? 'Booking...' : 'Book Now'}
        </Button>
      </form>
    </div>
  );
};

export default ReservationForm;
