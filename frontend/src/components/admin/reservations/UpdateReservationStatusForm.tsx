"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReservationStatus, UpdateReservationStatusRequest } from "@/types/reservation";

interface UpdateReservationStatusFormProps {
  reservationId: string;
  initialStatus: ReservationStatus | null;
  initialNotes: string | null;
  onSubmit: (data: UpdateReservationStatusRequest) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']),
  notes: z.string().optional(),
});

const UpdateReservationStatusForm: React.FC<UpdateReservationStatusFormProps> = ({
  reservationId,
  initialStatus,
  initialNotes,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: initialStatus ?? 'PENDING',
      notes: initialNotes ?? '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      status: values.status,
      notes: values.notes || null,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add notes for the reservation"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel} className="secondary-cta">
            Cancel
          </Button>
          <Button type="submit" className="primary-cta">
            Update Status
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateReservationStatusForm;