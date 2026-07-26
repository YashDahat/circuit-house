'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '@/services/testimonialService';
import type { TestimonialDto } from '@/types/testimonial';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TestimonialsTable } from '@/components/admin/testimonials/TestimonialsTable';
import TestimonialForm from '@/components/admin/testimonials/TestimonialForm';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircleIcon } from 'lucide-react';

const AdminTestimonialsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialDto | undefined>(undefined);

  const {
    data: testimonials,
    isLoading,
    error,
  } = useQuery<TestimonialDto[], Error>({
    queryKey: ['adminTestimonials'],
    queryFn: getAllTestimonials,
  });

  const createTestimonialMutation = useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTestimonials'] });
      toast.success('Testimonial created successfully.');
      setIsFormOpen(false);
    },
    onError: (err) => {
      toast.error(`Failed to create testimonial: ${err.message}`);
    },
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TestimonialDto }) => updateTestimonial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTestimonials'] });
      toast.success('Testimonial updated successfully.');
      setIsFormOpen(false);
      setEditingTestimonial(undefined);
    },
    onError: (err) => {
      toast.error(`Failed to update testimonial: ${err.message}`);
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTestimonials'] });
      toast.success('Testimonial deleted successfully.');
    },
    onError: (err) => {
      toast.error(`Failed to delete testimonial: ${err.message}`);
    },
  });

  const handleCreateTestimonial = (data: TestimonialDto) => {
    createTestimonialMutation.mutate(data);
  };

  const handleEditTestimonial = (testimonial: TestimonialDto) => {
    setEditingTestimonial(testimonial);
    setIsFormOpen(true);
  };

  const handleUpdateTestimonial = (data: TestimonialDto) => {
    if (editingTestimonial?.id) {
      updateTestimonialMutation.mutate({ id: editingTestimonial.id, data });
    }
  };

  const handleDeleteTestimonial = (id: string) => {
    deleteTestimonialMutation.mutate(id);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTestimonial(undefined);
  };

  if (error) {
    toast.error(`Error fetching testimonials: ${error.message}`);
  }

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#1A202C]">Testimonial Management</h1>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold transition-all duration-200"
                  onClick={() => {
                    setEditingTestimonial(undefined);
                    setIsFormOpen(true);
                  }}
                >
                  <PlusCircleIcon className="mr-2 h-5 w-5" /> Add New Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-lg shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-[#1A202C]">
                    {editingTestimonial ? 'Edit Testimonial' : 'Create New Testimonial'}
                  </DialogTitle>
                </DialogHeader>
                <TestimonialForm
                  initialData={editingTestimonial}
                  onSubmit={editingTestimonial ? handleUpdateTestimonial : handleCreateTestimonial}
                  onCancel={handleCloseForm}
                />
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <TestimonialsTable
              testimonials={testimonials}
              onEdit={handleEditTestimonial}
              onDelete={handleDeleteTestimonial}
            />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No testimonials found.</p>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminTestimonialsPage;