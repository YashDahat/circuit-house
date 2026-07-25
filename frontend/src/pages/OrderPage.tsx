import React from 'react';
import Layout from '@/components/Layout';
import OrderMenuSelection from '@/components/order/OrderMenuSelection';
import OrderCartView from '@/components/order/OrderCartView';
import OrderCheckoutForm from '@/components/order/OrderCheckoutForm';
import { CartProvider } from '@/context/CartContext';

const OrderPage: React.FC = () => {
  return (
    <Layout>
      <CartProvider>
        <section className="py-16 px-4 bg-[#F7FAFC]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <OrderMenuSelection />
            </div>
            <div className="lg:col-span-1 space-y-8">
              <OrderCartView />
              <OrderCheckoutForm />
            </div>
          </div>
        </section>
      </CartProvider>
    </Layout>
  );
};

export default OrderPage;