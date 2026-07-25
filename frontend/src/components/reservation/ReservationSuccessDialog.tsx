import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@radix-ui/react-dialog';
import { ReservationResponse } from '@/types/reservation';
import { Button } from '@radix-ui/react-alert-dialog';
import { ROUTES } from '@/routes';
import { useNavigate } from 'react-router-dom';

interface ReservationSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reservationDetails: ReservationResponse | null;
}

export function ReservationSuccessDialog({ isOpen, onClose, reservationDetails }: ReservationSuccessDialogProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    onClose();
    navigate(ROUTES.HOME);
  };

  if (!reservationDetails) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#D69E2E]">Reservation Confirmed!</DialogTitle>
          <DialogDescription className="text-gray-600">
            Your reservation has been successfully booked. We look forward to seeing you!
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2 text-gray-700">
          <p><strong>Confirmation ID:</strong> {reservationDetails.id ?? 'N/A'}</p>
          <p><strong>Name:</strong> {reservationDetails.customerName ?? 'N/A'}</p>
          <p><strong>Email:</strong> {reservationDetails.customerEmail ?? 'N/A'}</p>
          <p><strong>Phone:</strong> {reservationDetails.customerPhone ?? 'N/A'}</p>
          <p><strong>Time:</strong> {reservationDetails.reservationTime ?? 'N/A'}</p>
          <p><strong>Guests:</strong> {reservationDetails.numberOfGuests ?? 'N/A'}</p>
          <p><strong>Status:</strong> {reservationDetails.status ?? 'N/A'}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleGoHome}
            className="bg-[#D69E2E] hover:bg-[#c08e2a] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          >
            Go to Home
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}