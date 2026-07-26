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
import { Checkbox } from "@/components/ui/checkbox";
import { EventDto } from "@/types/event";

const formSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().min(1, "Description is required"),
  eventDate: z.string().min(1, "Event date is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  active: z.boolean().default(false),
});

interface EventFormProps {
  initialData?: EventDto;
  onSubmit: (data: EventDto) => void;
  onCancel: () => void;
}

export function EventForm({ initialData, onSubmit, onCancel }: EventFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      eventDate: initialData?.eventDate ?? "",
      imageUrl: initialData?.imageUrl ?? "",
      active: initialData?.active ?? false,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit({ ...initialData, ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Event Name</FormLabel>
              <FormControl>
                <Input {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm" />
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
                <Textarea {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Event Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm" />
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
                <Input {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Active
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-[#2D3748] font-semibold rounded-md px-4 py-2 transition-all duration-200">
            Cancel
          </Button>
          <Button type="submit" className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200">
            {initialData ? "Save Changes" : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  );
}