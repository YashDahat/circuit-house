import { TestimonialDto } from '@/types/testimonial';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

interface TestimonialsTableProps {
  testimonials: TestimonialDto[];
  onEdit: (testimonial: TestimonialDto) => void;
  onDelete: (id: string) => void;
}

export function TestimonialsTable({ testimonials, onEdit, onDelete }: TestimonialsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, startIndex + itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {currentTestimonials.map((testimonial) => (
            <TableRow key={testimonial.id} className="hover:bg-gray-50">
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{testimonial.id}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testimonial.author}</TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{testimonial.content}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testimonial.rating}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testimonial.date ? new Date(testimonial.date).toLocaleDateString() : 'N/A'}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testimonial.approved ? 'Yes' : 'No'}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(testimonial)}
                  className="text-[#D69E2E] hover:text-[#B78B27] transition-all duration-200"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => testimonial.id && onDelete(testimonial.id)}
                  className="text-red-600 hover:text-red-800 transition-all duration-200 ml-2"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold transition-all duration-200"
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold transition-all duration-200"
        >
          Next
        </Button>
      </div>
    </div>
  );
}