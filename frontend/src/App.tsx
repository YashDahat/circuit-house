// Assembled from routes.ts by the route registry — re-derived every attempt.
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderStatusPage from './pages/OrderStatusPage';
import ReservationPage from './pages/ReservationPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminReservationsPage from './pages/admin/AdminReservationsPage';
import AdminTestimonialsPage from './pages/admin/AdminTestimonialsPage';
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient()

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/order-status" element={<OrderStatusPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute><AdminEventsPage /></ProtectedRoute>} />
            <Route path="/admin/menu" element={<ProtectedRoute><AdminMenuPage /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><AdminOrdersPage /></ProtectedRoute>} />
            <Route path="/admin/reservations" element={<ProtectedRoute><AdminReservationsPage /></ProtectedRoute>} />
            <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonialsPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
