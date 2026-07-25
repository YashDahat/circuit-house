"use client";

import Layout from "@/components/layout/Layout";
import { ReservationForm } from "@/components/reservation/ReservationForm";
import { ReservationSuccessDialog } from "@/components/reservation/ReservationSuccessDialog";
import type { ReservationResponse } from "@/types/reservation";
import { useState } from "react";

const ReservationPage: React.FC = () => {
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<ReservationResponse | null>(null);

  const handleReservationSuccess = (reservation: ReservationResponse) => {
    setReservationDetails(reservation);
    setIsSuccessDialogOpen(true);
  };

  const handleCloseSuccessDialog = () => {
    setIsSuccessDialogOpen(false);
    setReservationDetails(null);
  };

  return (
    <Layout>
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748]">Book Your Table at Circuit House</h1>
          <p className="mt-4 text-lg text-[#2D3748] leading-relaxed">
            Experience our graceful ambiance and exquisite dining. Reserve your spot now.
          </p>
          <div className="mt-10 max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-8">
            <ReservationForm onSuccess={handleReservationSuccess} />
          </div>
        </div>
      </section>
      <ReservationSuccessDialog
        isOpen={isSuccessDialogOpen}
        onClose={handleCloseSuccessDialog}
        reservationDetails={reservationDetails}
      />
    </Layout>
  );
};

export default ReservationPage;